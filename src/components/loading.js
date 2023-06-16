import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-message">
      <ThreeDots
        height="80"
        width="80"
        radius="20"
        color=" #00308F"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
