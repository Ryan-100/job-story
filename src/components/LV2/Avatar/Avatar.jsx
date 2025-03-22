import { Image, Text } from '@/components/LV1'
import React from 'react'
import { useTheme } from 'styled-components'

/**
 * @param width profile width
 * @param height profile height
 */

const Avatar = ({name,url,width,height}) => {
  const theme = useTheme();

  const stringAvatar = name => {
    if (name?.split(' ').length > 1) {
      return `${name.split(' ')[0][0].charAt(0)}${name.split(' ')[1][0].charAt(0)}`      
    } else {
      return name.charAt(0);
    }
  };

  return (
    <>
      {
        url?
        <div className={`cursor-pointer rounded-full max-w-[35px] max-h-[35px] relative overflow-hidden`} >
          <Image imageType='image' alt={name} src={url} className='rounded-full' />
        </div>:
        <div className={`cursor-pointer py-2 px-3 rounded-full flex items-center text-center overflow-hidden`} style={{backgroundColor:theme.primary}}>
          <p className={` rounded-full text-center text-white`}>{stringAvatar(name).toUpperCase()}</p>
        </div>
      }
    </>
  )
}
// max-w-[${width}px] max-h-[${height}px]
export default Avatar
