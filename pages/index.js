import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Nav from "@/components/Nav";
import Post from "@/components/Post";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>StudySpace</title>
        <MetaTags />
      </Head>
      <Header />
      <Nav />
      <Post />
      <Footer />
    </>
  );
};

export default index;
