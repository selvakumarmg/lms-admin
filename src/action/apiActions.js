import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useRouter } from 'next/navigation';



export async function partnerSingUp(apiData, setLoader) {



  setLoader(true);
  try {
    const { data } = await axios
      .post(api.partnerSingUp, apiData);
    setLoader(false);

    return data

  } catch (error) {
    console.log("error", error);
    setLoader(false);
    if (JSON.stringify(error.message) === '"Network Error"') {
    } else {
    }
  }
}


export async function LoginApi(apiData) {




  try {
    const { data } = await axios
      .post(api.LoginApi, apiData);


    return data

  } catch (error) {


    if (JSON.stringify(error.message) === '"Network Error"') {
    } else {
    }
    return error
  }
}
