import React from "react";
import Editor from "../components/Editor";
import BtnToggle from "../components/BtnToggle";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const BrandsCreate = () => {
  const [nom, setNom] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescrition] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const create = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:8000/api/brand`, {
        nom: nom,
        url: url,
        slug: slug,
        visibility: visibility,
        description: description,
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        setNom(""),
          setUrl(""),
          setSlug(" "),
          setVisibility(""),
          setDescrition("");
        navigate("/brands");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  const cancel = async (e) => {
    setNom(""), setUrl(""), setSlug(" "), setVisibility(""), setDescrition("");
    navigate("/categories");
  };
  const handleToggle = (e) => {
    setVisibility(!visibility);
  };
  return (
    <div className="container m-10 mx-auto">
      <h2 className="text-3xl py-3 font-bold">Create Brand</h2>

      <form onSubmit={create}>
        <div className="bg-white p-5 my-5 rounded-2xl">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
                required
                value={nom}
                onChange={(event) => {
                  setNom(event.target.value);
                }}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="slug"
                id="slug"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                }}
              />
              <label
                htmlFor="slug"
                className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Slug
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-1">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="website"
                id="website"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
                required
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
              />
              <label
                htmlFor="parent"
                className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                parent
              </label>
            </div>
            <div className="relative z-0 mb-6 group">
              <BtnToggle
                checked={visibility}
                value={visibility}
                handleClick={handleToggle}
                onChange={(event) => {
                  setVisibility(event.target.value);
                }}
                name={"Visible to Brand."}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-1">
            <div className="relative z-0 w-full mb-12 group">
              <Editor value={description} onChange={setDescrition} />
            </div>
          </div>
        </div>
        <div className="md:flex grid grid-cols-3 gap-4">
          <button
            type="submit"
            className="text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg md:text-sm text-xs w-full sm:w-auto px-3 py-2 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          >
            Create
          </button>
          <button
            type="submit"
            className="col-span-2 border-2 bg-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-xs w-full md:text-sm sm:w-auto px-3 py-2 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          >
            Create & create another
          </button>
          <button
            type="submit"
            className=" bg-white border-2 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-xs w-full md:text-sm sm:w-auto px-3 py-2 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandsCreate;
