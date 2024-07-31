'use client'
import Image from 'next/image'
import visibilityOff from '../../../public/visibility_off.svg'
import visibilityOn from '../../../public/visibility_on.svg'
import { useState } from 'react'

const Page = () => {
  const [visibility, setVisibility] = useState(false)
  return (
    <>
      <section className="bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF] w-[100vw] h-[100vh]">
        <div className="flex justify-center pt-[7.5rem]">
          <form
            action=""
            className="w-[40.5rem] h-[29.75rem] bg-[#F7F7F7] rounded-[1rem] border-2 border-[#F0F0F0] flex flex-col justify-center items-center"
          >
            <div>
              <h1 className="text-[3rem] font-[600] mb-[2rem]">
                Welcome to <span className="text-[#4534AC]">Workflo</span>!
              </h1>
            </div>
            <div className="w-[33rem]">
              <input
                type="text"
                placeholder="Full Name"
                className="h-[56px] rounded-[0.5rem] py-[1rem] px-[0.75rem] border-1 border-[#999999] text-[#606060] text-[24px] w-[100%] outline-[#999999] mb-[1.5rem] bg-[#EBEBEB] font-[400]"
              />
            </div>
            <div className="w-[33rem]">
              <input
                type="text"
                placeholder="Your email"
                className="h-[56px] rounded-[0.5rem] py-[1rem] px-[0.75rem] border-1 border-[#999999] text-[#606060] text-[24px] w-[100%] outline-[#999999] mb-[1.5rem] bg-[#EBEBEB] font-[400]"
              />
            </div>
            <div className="w-[33rem] relative">
              <input
                type="password"
                placeholder="Password"
                className="h-[56px] rounded-[0.5rem] py-[1rem] px-[0.75rem] border-1 border-[#999999] text-[#606060] text-[24px] w-[100%] outline-[#999999] mb-[1.5rem] bg-[#EBEBEB] font-[400]"
              />
              <div className="eye absolute right-4 bottom-10 z-50 cursor-pointer">
                {visibility ? (
                  <span>
                    <Image
                      src={visibilityOff}
                      alt="Visibility Off"
                      width={24}
                      height={24}
                    />
                  </span>
                ) : (
                  <span>
                    <Image
                      src={visibilityOn}
                      alt="Visibility On"
                      width={24}
                      height={24}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="w-[33rem] mb-[2rem] h-[52px]">
              <button className="text-center w-[100%] h-[100%] bg-gradient-to-b from-[#4C38C2] to-[#2F2188] rounded-[0.5rem] p-[0.5rem] text-[#FFFFFF] text-[20px] opacity-70 hover:opacity-100 transition-all delay-100">
                Sign up
              </button>
            </div>
            <div className="text-[20px]">
              Already have an account?
              <span className="text-[#0054A1]"> Log in.</span>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default Page
