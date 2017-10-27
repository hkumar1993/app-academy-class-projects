import React from 'react'
import * as APIUtil from '../util/bench_api_util'

export const RECEIVE_BENCHES = 'RECEIVE_BENCHES'

 const receiveBenches = benches => ({
   type: RECEIVE_BENCHES,
   benches
 })

 export const fetchBenches = () => dispatch => {
   return APIUtil.fetchBenches().then(res => dispatch(receiveBenches(res)))
 }
