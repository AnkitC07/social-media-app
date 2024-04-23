import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useContext } from "react";
import { PostContext } from "../../_context/Post";

export default function PostSwiper({ posts }) {
    const { setModalImage } = useContext(PostContext);
    const handleClick = (url) => {
        setModalImage({
            url: url,
            open: true,
        });
    };
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper w-full h-full bg-[#f3f3f3] rounded-3xl'
    >
      {posts.map((post, i) => {
        const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(post);
        const isVideo = /\.(mp4|webm|ogv|mpg|mpeg)$/.test(post);

        return (
          <SwiperSlide onClick={()=>handleClick(post)} key={i} className='w-full h-full'>
            <>
              {isImage && (
                <div className='relative w-full h-full' key={i}>
                  <Image
                    className='object-contain'
                    src={post}
                    alt='Picture of the author'
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading='lazy'
                    placeholder='empty'
                  />
                </div>
              )}

              {isVideo && (
                <video
                  className='block w-full h-full object-center absolute right-0  [animation-timeline:view(x)] mb-2'
                  autoPlay={true}
                  loop={true}
                  src={post}
                  alt={`Preview of Post`}
                  playsInline=''
                  // controls
                />
              )}
            </>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}