import Image from 'next/image'

function Loading() {
  return (
    <div className="flex items-center justify-center relative w-screen max-h-screen ">
      <Image src="/loading.gif" alt="Logo" fill />
    </div>
  )
}

export default Loading