const NoteImage = ({ slug, src, alt }: any) => {
  const realSrc = `/notes/${slug}/${src.substring(2, src.length)}`;
  return (
    <div className=" w-auto h-auto relative rounded-lg mt-3 -mb-2 overflow-hidden">
      <img
        className="w-[90%] mx-auto border-2 border-black dark:border-white"
        src={realSrc}
        alt={alt}
      />
      <p className="italic text-center mt-2">{alt}</p>
    </div>
  );
};

export default NoteImage;
