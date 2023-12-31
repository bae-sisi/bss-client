'use client';

import React, { useState } from 'react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function Footer() {
  // 현재 년도를 가져오기
  const currentYear = new Date().getFullYear();

  const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = useState<
    string | undefined
  >();

  return (
    <div className='w-full flex justify-start mt-auto font-light text-[10px] py-5 px-3 leading-[1.175rem] bg-[#505050]'>
      <div className='flex flex-col 3xs:flex-row gap-10 justify-between mx-auto w-[60rem]'>
        <div>
          <div className='mb-5 mx-auto text-[#eee]'>
            <button onClick={() => setOpenPrivacyPolicyModal('default')}>
              개인정보처리방침
            </button>
            {openPrivacyPolicyModal ? (
              <PrivacyPolicyModal
                openPrivacyPolicyModal={openPrivacyPolicyModal}
                setOpenPrivacyPolicyModal={setOpenPrivacyPolicyModal}
              />
            ) : null}
          </div>
          <div className='flex'>
            <span className='mt-3 mr-2 text-[#eee]'>
              충청북도 청주시 서원구 충대로1(개신동) 소프트웨어학부
              S4-1동(전자정보 3관)
            </span>
            {/* <span className="before:content-['|'] mx-2 font-thin text-[#eee]"></span> */}
            {/* <a
            href="mailto:developersung13@gmail.com?subject=[Contact] &body=Name : %0D%0A%0D%0ATel : %0D%0A%0D%0AContent : %0D%0A"
            className="flex ml-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              className="mr-1"
            >
              <path
                fill="white"
                d="M180.309-212.001q-27.008 0-45.658-18.662-18.65-18.662-18.65-45.686v-407.626q0-27.024 18.65-45.524t45.658-18.5h599.382q27.008 0 45.658 18.662 18.65 18.662 18.65 45.686v407.626q0 27.024-18.65 45.524t-45.658 18.5H180.309ZM480-449.694 168-633.309v357q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h599.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-357L480-449.694ZM480-517l305.846-179H174.154L480-517ZM168-633.309V-696-276.309q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462H168v-369.309Z"
              />
            </svg>
            developersung13@gmail.com
          </a> */}
          </div>
          <div className='mt-2 text-[#ccc]'>
            © {currentYear} BAE-SISI. All rights reserved.
          </div>
        </div>
        <div className='flex gap-5 mt-auto mr-2'>
          <a
            href='https://software.cbnu.ac.kr/'
            target='_blank'
            className='relative left-[-5px]'
          >
            <img
              src='/images/cbnu_logo.png'
              alt='cbnu_logo'
              className='w-[8rem] 3xs:w-[10rem]'
            />
          </a>
        </div>
      </div>
    </div>
  );
}
