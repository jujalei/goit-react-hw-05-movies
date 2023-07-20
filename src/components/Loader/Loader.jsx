import { Hearts } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Hearts
      height="200"
      width="200"
      color="#4fa94d"
      ariaLabel="hearts-loading"
      wrapperStyle={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};
