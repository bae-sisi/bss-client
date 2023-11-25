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
          <div className='w-[22.5rem] 3xs:w-[27.5rem] p-2 mb-8 2lg:mb-0'>
            <div className='mb-5'>
              <Link
                href='/events'
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

          <div className='w-[22.5rem] 3xs:w-[27.5rem] p-2 '>
            <div className='mb-5'>
              <Link
                href='/findMembers'
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
              <FindMember />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
