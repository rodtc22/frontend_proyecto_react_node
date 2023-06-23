const Modal = (props) => {
  return (
    <>
      {props.modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-black opacity-50 "></div>
          <div className="bg-white rounded-lg p-6 relative w-2/3 md:w-1/2 xl:w-1/3">
            <h2>Mi titulo</h2>
            {props.children}
            <button
              className="bg-gray-300 hover:bg-gray-400 rounded-full px-2  mt-4 mr-4 absolute top-0 right-0"
              onClick={() => props.setOpenModal(false)}
            >
              {" "}
              X{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
