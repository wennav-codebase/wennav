import Image from 'next/image'

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen relative w-screen aspect-video">
      <Image src="/loading.gif" alt="Logo" fill />
    </div>
  )
}

export default Loading