'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React, { useState } from 'react';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

export default function Register() {
  const [openModal, setOpenModal] = useState<string | undefined>();

  return (
    <div className='h-[30rem] mt-12 px-5 2lg:px-0 overflow-x-auto'>
      <div className='flex flex-col w-[20rem] mx-auto'>
        <form className='flex max-w-md flex-col gap-4'>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='email'
                value='이메일'
                className={`after:content-['*'] after:text-red-500 after:ml-[0.05rem]`}
              />
            </div>
            <TextInput
              id='email'
              placeholder='abc123@naver.com'
              required
              shadow
              type='email'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='password2'
                value='비밀번호'
                className={`after:content-['*'] after:text-red-500 after:ml-[0.05rem]`}
              />
            </div>
            <TextInput id='password2' required shadow type='password' />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='repeat-password'
                value='비밀번호 확인'
                className={`after:content-['*'] after:text-red-500 after:ml-[0.05rem]`}
              />
            </div>
            <TextInput id='repeat-password' required shadow type='password' />
          </div>
          <div className='flex items-center  text-xs'>
            <Checkbox id='agree' required />
            <div className='text-cyan-600 hover:underline dark:text-cyan-500 ml-2'>
              <span onClick={() => setOpenModal('default')}>
                개인정보 수집 및 이용
              </span>
              {openModal ? (
                <PrivacyPolicyModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              ) : null}
            </div>
            <span>에 동의합니다</span>
          </div>
          <button
            type='submit'
            className='mt-5 bg-[#3870e0] text-white px-4 py-[0.6rem] rounded-md font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
