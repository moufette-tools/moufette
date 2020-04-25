import React, { useEffect } from 'react'
import script from '../../scripts/js-loader.min.txt';

const Setup = ({ currentUser }: any) => {
   const url = window.location.origin
   const token = currentUser?.team?.token

   return (
      <>
         <p>To integrate Moufette, copy + paste the following snippet to your website. Ideally, put it just above the {"</head>"} tag.</p>
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