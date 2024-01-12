import axios from 'axios'
import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { useRouter } from 'next/navigation'

export async function partnerSingUp(apiData, setLoader) {
  setLoader(true)
  try {
    const { data } = await axios.post(api.partnerSingUp, apiData)
    setLoader(false)

    return data
  } catch (error) {
    setLoader(false)
  }
}

export async function LoginApi(apiData) {
  try {
    const { data } = await axios.post(api.LoginApi, apiData)

    return data
  } catch (error) {
    return error
  }
}


export async function CreateLeadApi(apiData, setLoader, method) {
  setLoader(true)
  try {
    const { data } = await axios[method](api.addLead, apiData)
    setLoader(false)
    return data
  } catch (error) {
    setLoader(false)
  }
}

export async function CreateAssetApi(assetData, setLoader) {
  setLoader(true)
  try {
    const { data } = await axios.post(api.assetApi, assetData)
    setLoader(false)
    return data
  } catch (error) {
    setLoader(false)
  }
}


export async function getLeadApi(Profile_Status_Id,
  User_Id,
  User_Role_Id, setLoader) {
  setLoader(true)
  try {
    const { data } = await axios.get(api.addLead + `?user_role_id=1&user_id=1&status_id=1`)
    setLoader(false)
    return data
  } catch (error) {
    setLoader(false)
  }
}


