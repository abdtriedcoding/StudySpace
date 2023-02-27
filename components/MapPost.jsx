// Destructing the object from its original name from databse so that if we want we can give name according to us.
import { Timestamp } from "firebase/firestore";
export const MapPost = (data) => {
  const { title, image, pdf, subtitle, timestamp, sizeInMB1, category, id } = data;
  const namePost = {
    title: title ?? "",
    subtitle: subtitle ?? "",
    timestamp: timestamp?.toDate().toDateString() ?? Timestamp.now(),
    image: image ?? "",
    category: category ?? "",
    sizeInMB1: sizeInMB1 ?? "",
    pdf: pdf ?? "",
    id: id ?? ""
  };
  return namePost;
};