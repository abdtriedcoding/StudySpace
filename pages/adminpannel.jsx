import Header from "@/components/Header";
import { db, storage } from "@/firebaseClient";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getMetadata, ref, uploadString } from "firebase/storage";
import { useState } from "react";

function Adminpannel() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");

  // Send the post to firebase firestore.
  const sendPostToFirebase = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Image not selected !")
      return;
    }
    try {
      const reff = doc(db, `subjectPosts/${slug}`);
      await setDoc(reff, {
        title: title ?? "",
        subtitle: subtitle ?? "",
        category: category ?? "",
        timestamp: serverTimestamp(),
      });

      const pdfRef = ref(storage, `subjectsImage/${slug}/image1`);
      await uploadString(pdfRef, pdf, "data_url").then(async (snapshot) => {
        const downloadURL = await getDownloadURL(pdfRef);
        const metadata = await getMetadata(pdfRef);
        const sizeInBytes = metadata.size;
        const sizeInMB = sizeInBytes / 1024 / 1024;

        const imageRef = ref(storage, `subjectsImage/${slug}/image2`);
        await uploadString(imageRef, image, "data_url").then(
          async (snapshot) => {
            const downloadURL2 = await getDownloadURL(imageRef);

            await updateDoc(doc(db, `subjectPosts/${slug}`), {
              pdf: downloadURL,
              sizeInMB1: sizeInMB,
              image: downloadURL2,
            });
          }
        );
      });
    } catch (error) {
      alert(error);
    }
    setTitle("");
    setSubTitle("");
    setImage("");
    setPdf("");
    setCategory("");
    setSlug("");
    setImage(null);
    setPdf(null)
  };

  // Select pdf from the device.
  const PdfSelect = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPdf(readerEvent.target.result);
    };
  };

  // Select Image from the device.
  const ImageSelect = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <>
      <Header />

      <div className="bg-gray-100">
        <div className="p-5 max-w-7xl mx-auto">
          <div>
            <span className="font-bold text-gray-700">Title : </span>
            <div className="py-1"></div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border-2 py-2 px-5 text-[20px] font-bold shadow-md focus:shadow-inner focus:outline-blue-300"
              type="text"
            />
            <div className="py-2"></div>
            <span className="font-bold text-gray-700">SubTitle : </span>
            <div className="py-1"></div>
            <input
              value={subtitle}
              onChange={(e) => {
                setSubTitle(e.target.value);
                setSlug(e.target.value.replaceAll(" ", "-"));
              }}
              className="w-full rounded-md border-2 py-2 px-5 text-[20px] font-bold shadow-md focus:shadow-inner focus:outline-blue-300"
              type="text"
            />
            <div className="py-2"></div>
            <span className="font-bold text-gray-700">Category : </span>
            <div className="py-1"></div>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border-2 py-2 px-5 text-[20px] font-bold shadow-md focus:shadow-inner focus:outline-blue-300"
              type="text"
            />
            <div className="py-2"></div>

            <div className="py-2"></div>
            <span className="font-bold text-gray-700">Slug : </span>
            <div className="py-1"></div>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md border-2 py-2 px-5 text-[20px] font-bold shadow-md focus:shadow-inner focus:outline-blue-300"
              type="text"
            />
            <div className="py-2"></div>
            <img className="w-50 h-50" src={image} alt="" />
            <div className="space-y-3 py-2">
              <div className="flex shrink-0 gap-2 font-bold text-gray-600">
                <span>
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </span>

                Featured Image :
              </div>
              <input
                onChange={ImageSelect}
                type="file"
                className="p-2 block cursor-pointer text-sm text-gray-500 file:cursor-pointer file:rounded-full file:border-0 file:bg-gray-800 file:py-2 file:px-4 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
              />
            </div>
            <div className="space-y-3 py-2">
              <div className="flex shrink-0 gap-2 font-bold text-gray-600">
                <span>
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </span>
                Featured PDF :
              </div>
              <input
                onChange={PdfSelect}
                type="file"
                className="p-2 block cursor-pointer text-sm text-gray-500 file:cursor-pointer file:rounded-full file:border-0 file:bg-gray-800 file:py-2 file:px-4 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={sendPostToFirebase}
              className="rounded-full border-2 border-blue-600 py-2 px-4 font-bold text-blue-600 shadow-xl hover:bg-blue-600 hover:text-white"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminpannel;
