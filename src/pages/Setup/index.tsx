import React, { useEffect } from 'react'
import script from '../../scripts/js-loader.min.txt';

const Setup = ({ currentUser }: any) => {
   const url = window.location.origin
   const token = currentUser?.team?.token

   return (
      <pre>
         {`
<script>
   ${script}
   moufette.init("${token}", { api_host: "${url}" })
</script>
         `}
      </pre>
   )
}

export default Setup