import images from 'assets/images'

export const renderStar = (rate: number) => {
  let tmp = []
  for (let x = 0; x < 5; x++) {
    if (x < rate) {
      tmp.push(<img src={images.ic_star_fill} alt='' className='w-4 h-4' />)
    } else {
      tmp.push(<img src='' alt='' />)
    }
  }
  return tmp
}
