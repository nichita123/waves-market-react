import axios from "axios";

import { GET_SITE_INFO, UPDATE_SITE_INFO } from "./types";

import { SITE_SERVER } from "../../components/utils/misc";

export function getSiteInfo() {
  const req = axios.get(`${SITE_SERVER}/site-data`).then(res => res.data);

  return {
    type: GET_SITE_INFO,
    payload: req
  };
}

export function updateSiteInfo(dataToSubmit) {
  const req = axios
    .post(`${SITE_SERVER}/site-data`, dataToSubmit)
    .then(res => res.data);

  return {
    type: UPDATE_SITE_INFO,
    payload: req
  };
}
