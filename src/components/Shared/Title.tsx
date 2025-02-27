interface TitleProps {
  title: string;
  description: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center mb-5">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h1>

        <div className=" bg-gradient-to-r from-blue-500 to-transparent  p-[3px] my-2 w-full"></div>
      </div>

      <p className="mt-3 text-gray-300 md:text-lg">
        {description}
      </p>
    </div>
  );
};

export default Title;
