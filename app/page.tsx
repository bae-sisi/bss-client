import Link from 'next/link';
import FindMember from './components/FindMember';
import Event from './components/Event';

export default function Home() {
  return (
    <div className='mt-[-5rem]'>
      <div className="h-64 flex justify-center items-center bg-[url('/images/main_banner.jpg')] bg-cover bg-center">
        <span className='text-4xl text-center text-white font-thin tracking-[1.5rem] fade-in mt-12 px-5 uppercase'>
          sw community
        </span>
      </div>
      <div className='flex'>
        <div className='flex-col 2lg:flex-row mx-auto mt-12 mb-10 flex justify-center gap-5'>
          <div className='w-[22.5rem] 3xs:w-[30rem] p-2 mb-8 2lg:mb-0'>
            <div className='mb-5'>
              <Link
                href='/evnets'
                className='text-[#595f68] text-xl pb-[11px] border-b-2 border-[#3274ba] hover:text-black focus:text-black'
              >
                신규 행사
              </Link>
              <div className='pb-2 border-b-[1.5px] border-dotted'></div>
            </div>

            <div className='flex flex-col gap-3'>
              {/* 데이터 임시로 추가 */}
              <Event />
              <Event />
              <Event />
              <Event />
            </div>
          </div>

          <div className='w-[22.5rem] 3xs:w-[30rem] p-2 '>
            <div className='mb-5'>
              <Link
                href='/exams'
                className='text-[#595f68] text-xl pb-[11px] border-b-2 border-[#3274ba]'
              >
                신규 팀원 모집
              </Link>
              <div className='pb-2 border-b-[1.5px] border-dotted'></div>
            </div>

            <div className='flex flex-col gap-3'>
              {/* 데이터 임시로 추가 */}
              <FindMember />
              <FindMember />
              <FindMember />
              <div className='relative flex flex-col gap-4 bg-[#f7f7f7] p-3 group'>
                <p className='font-bold'>
                  <Link href='/' className='hover:underline'>
                    코딩테스트 3차
                  </Link>
                </p>
                <div>
                  <span className='text-xs font-semibold'>
                    진행 기간 :{' '}
                    <span className='font-light'>
                      2023.06.26. 03:00 ~ 2023.06.26. 03:00
                    </span>
                  </span>
                </div>

                <div className='absolute right-0 bottom-0 border-l-[0.6rem] border-l-[#eee] border-t-[0.6rem] border-t-[#eee] border-b-[0.6rem] border-b-white border-r-[0.6rem] border-r-white group-hover:border-l-[#3274ba] group-hover:border-t-[#3274ba] ease-in duration-100'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
