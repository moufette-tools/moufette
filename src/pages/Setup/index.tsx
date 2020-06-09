import React, { useEffect } from 'react'

import { useQueryProperty } from '../../hooks/property'

import script from '../../scripts/js-loader.min.txt';

const Setup = ({ currentUser }: any) => {
   const url = window.location.origin
   const { loading, error, data } = useQueryProperty()

   if(loading) return <div>loading...</div>

   const token = data?.property?.token

   return (
      <>
         <p>To integrate Moufette, copy + paste the following snippet to your website. Ideally, put it just above the <strong>{"</head>"}</strong> tag.</p>
         <pre>
            {`
<script>
   ${script}
   moufette.init("${token}", { api_host: "${url}" })
</script>
         `}
         </pre>
      </>
   )
}

export default Setup