import { combineSlices } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";

export const reducer = combineSlices(api);
