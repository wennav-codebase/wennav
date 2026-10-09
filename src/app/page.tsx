"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
export default function Home() {
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    } , 2000)
  } , [])
  if (loading) {
    return <Loading />
  }
  return (
    <section className="
    hero-bg  flex flex-col items-start justify-between h-screen">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={100}
        className="mx-5 mt-2"
      />
      <motion.div  
      initial = {{opacity: 0, y: 20}}
      animate = {{opacity: 1, y: 0}}
      transition = {{duration: 0.5}}
      className="flex flex-col self-center items-center gap-y-2" >
        <h1 className="font-heading text-6xl font-bold italic text-secondary uppercase">Coming <span className="text-accent">Soon!!</span>
        </h1>
        <p className="font-text text-secondary text-xl">Your Problem’s Solution Is Almost Here :)</p>
      </motion.div>
      <div></div>
    </section>
  );
}
