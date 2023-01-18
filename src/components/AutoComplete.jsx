export const AutoComplete = () => {
  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input
          type='text'
          id='search'
          className='form-control'
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          placeholder='Search'
          autoComplete='off'
        />
        <label htmlFor='search'>Search</label>
        {/* <ul
          className='dropdown-menu show'
          style={{ height: "200px", width: "100%", overflowY: "scroll" }}
        >
        </ul> */}
      </div>
    </div>
  );
};
