"use client";

import React from "react";
import { Badge } from "@/components/write";
import { IoIosMail } from "react-icons/io";
import { AiFillGithub } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

interface ResumeProps {
  isMe?: boolean;
}

export default function Resume({ isMe = false }: ResumeProps) {
  const downloadPdf = () => {
    const pdfRef = document.getElementById("resume");

    if (pdfRef) {
      const el = document.createElement("div");
      el.appendChild(pdfRef?.cloneNode(true));
      const prevBody = document.body.innerHTML;
      window.onbeforeprint = () => {
        document.body.innerHTML = el.innerHTML;
      };
      window.onafterprint = () => {
        document.body.innerHTML = prevBody;
        window.location.href = "/resume";
      };
      window.print();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-10 pb-8 px-4">
      <div id="resume" className="w-full [&_li]:ml-8">
        <div className="flex flex-col space-y-14">
          {/* 기본정보 */}
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <h2 className="text-2xl ">김찬우</h2>
              <span className="text-gray-500">Web Developer</span>
            </div>
            <div className="pl-3">
              <p>2000.10.07</p>
              <div className="flex items-center gap-2">
                <IoIosMail />
                <a href="mailto:hanrhfqkq@gmail.com">hanrhfqkq@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <AiFillGithub />
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://github.com/chanooda"
                >
                  https://github.com/chanooda
                </a>
              </div>
              <div className="flex items-center gap-2">
                <AiFillHome />
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://blog.chanoo.org"
                >
                  개발 블로그
                </a>
              </div>
            </div>
            {!isMe && (
              <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <p className="text-base">
                  React, Typescript를 주력으로 하는 개발 경력 1년차 웹 프론트 엔지니어 입니다.
                  <br />
                  <br />웹 프론트엔드 개발자로 첫 입사 후 한달 뒤 주요 신규
                  프로젝트에 참여하였습니다. 팀원과 소통하며 새로운 기술
                  스택들을 성공적으로 도입하였습니다. 그 후에는 단독으로 사내 첫
                  내부 서비스 프론트엔드 개발에 참여하여 웹앱 환경에서 동작하는
                  서비스를 개발하였습니다. 프론트엔드, 백엔드, 데스크탑 앱 등
                  크고 작은 프로젝트를 맡으며 다양한 개발자들과 협업할 수 있는
                  기반을 닦았습니다.
                  <br />
                  <br />
                  로봇처럼 주어진대로 개발만 하는 것이 아닌, 언제나 개선점과
                  행동에 대한 이유를 생각하며 개발하려 하고 있습니다. 업무와
                  관련하여 팀원들과 적극적으로 문제점과 개선점에 대해
                  소통합니다.
                  <br />
                  <br />
                  모르는 것을 두려워하지 않고, 물어보는 것을 두려워 하지
                  않습니다. 새로운 것들에 대해 공부하는 것을 즐깁니다.
                  프론트엔드 개발자에 국한되는 것이 아닌 다양한 분야에 대한
                  튼튼한 기초를 새우며 개발과 협업에 대한 전반적인 이해를 쌓으려
                  합니다.
                </p>
              </div>
            )}
          </div>
          {/* 기술 */}
          <div>
            <h2 className="text-2xl mb-2">기술</h2>
            <ul className="flex flex-col gap-2 list-disc">
              <li>
                <div className="flex gap-2 flex-wrap flex-col">
                  <h3 className="block w-[80px]">공통</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      color="F7DF1E"
                      label="JavaScript"
                      iconColor="black"
                    />
                    <Badge color="3178C6" label="TypeScript" />
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-2 flex-wrap flex-col">
                  <h3 className="block w-[80px]">프론트엔트</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge color="61DAFB" label="React" iconColor="black" />
                    <Badge color="000000" label="Next.js" />
                    <Badge color="FF4154" label="React Query" />
                    <Badge color="EC5990" label="React Hook Form" />
                    <Badge color="DB7093" label="styled components" />
                    <Badge color="06B6D4" label="Tailwind CSS" />
                    <Badge color="007FFF" label="MUI" />
                    <Badge color="b543ac" label="Emotion" />
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-2 flex-wrap flex-col">
                  <h3 className="block w-[80px]">백엔드</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge color="339933" label="Node.js" />
                    <Badge color="000000" label="Express" />
                    <Badge color="E0234E" label="NestJS" />
                    <Badge color="2D3748" label="Prisma" />
                    <Badge color="ff5914" label="TypeOrm" />
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-2 flex-wrap flex-col">
                  <h3 className="block w-[80px]">기타</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge color="F05032" label="Git" />
                    <Badge color="FF9900" label="Amazon EC2" />
                    <Badge color="569A31" label="Amazon S3" />
                    <Badge color="2088FF" label="GitHub Actions" />
                    <Badge color="2496ED" label="Docker" />
                    <Badge color="47848F" label="Electron" />
                    <Badge color="FF4785" label="Storybook" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* 경력 */}
          <div>
            <h2 className="text-2xl mb-2">경력</h2>
            <ul className="list-disc">
              <li>
                <div>
                  <h3 className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      (주)라온스토리
                    </span>
                    <div className="w-[1px] h-[15px] bg-gray-500" />
                    <span>2022.07 ~ 재직중</span>
                  </h3>
                  {!isMe && (
                    <>
                      <span className="text-sm ">웹 프론트엔드 개발자</span>
                      <ul className="mt-4 list-[circle] space-y-4">
                        <li>
                          <div>
                            <h4 className="font-semibold mb-2">
                              웹 신규 서비스 클라이언트 개발
                            </h4>
                            <p>
                              - 한국서부발전의 계좌이체거래약정서 등록 정부과제
                              웹서비스 개발
                            </p>
                            <p>
                              - 사내 첫 내부 서비스 웹앱 프론트엔드 단독 개발
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h4 className="font-semibold mb-2">
                              웹 프론트엔드 신규 개발기술 도입 및 개선
                            </h4>
                            <p>
                              - 모노레포 및 디자인 시스템을 이용한 관리자 웹
                              서비스 단독 개발
                            </p>
                            <p>
                              - react 관련 신규 라이브러리, 기술 실서비스 도입
                            </p>
                          </div>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
          {/* 참여 프로젝트 */}
          {!isMe && (
            <div>
              <h2 className="text-2xl mb-2">프로젝트</h2>
              <ul className="list-disc space-y-8">
                <li>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">홈즈</h3>
                    <p>
                      임대인과 임차인은 자신의 매물을 등록하고 중개인은 매물
                      정보를 확인하고 연결해주는 부동산 웹앱 서비스
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge color="3178C6" label="TypeScript" />
                      <Badge color="61DAFB" label="React" iconColor="black" />
                      <Badge color="FF4154" label="React Query" />
                      <Badge color="EC5990" label="React Hook Form" />
                      <Badge color="007FFF" label="MUI" />
                      <Badge color="b543ac" label="Emotion" />
                      <Badge color="9333EA" label="Lerna" />
                      <Badge color="FF4785" label="Storybook" />
                    </div>
                    <ul className="list-[circle] space-y-4">
                      <li>
                        <h4>역할</h4>
                        <ul className="list-[square]">
                          <li>
                            총 3명 (디자이너, 백엔드 개발자, 프론트엔드 개발자)
                          </li>
                          <li>프론트엔드 개발 (기여도 100%)</li>
                        </ul>
                      </li>
                      <li>
                        <h4>상세 업무</h4>
                        <ul className="list-[square]">
                          <li>
                            서비스 앱, 관리자 페이지, 홍보 랜딩 페이지 개발
                          </li>
                          <li>
                            lerna, emotion을 이용한 모노레포 및 디자인 시스템을
                            구성하여 관리자 웹 서비스 구현
                          </li>
                          <li>
                            네이티브 앱과 연동하기 위한 모바일 환경 및 반응형
                            구현
                          </li>
                        </ul>
                      </li>
                      <li>개발기간 : 2023.01 ~ 2023.02</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="font-semibold text-lg">
                      한국서부발전 계좌이체거래약정서 등록 시스템
                    </h3>
                    <p>
                      기존의 오프라인으로 진행 되었던 한국서부발전 사업 평가에
                      참여하는 회원의 정보를 관리하고 회원들의
                      계좌이체거래약정서를 등록, 승인, 관리하는 웹 서비스
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <Badge color="3178C6" label="TypeScript" />
                      <Badge color="61DAFB" label="React" iconColor="black" />
                      <Badge color="FF4154" label="React Query" />
                      <Badge color="EC5990" label="React Hook Form" />
                      <Badge color="4c74e3" label="Recoil" />
                      <Badge color="DB7093" label="styled components" />
                    </div>
                    <ul className="list-[circle] mt-2 space-y-4">
                      <li>
                        <h4>역할</h4>
                        <ul className="list-[square]">
                          <li>
                            총 6명 (디자이너 1, 백엔드 개발자 2, 프론트엔드
                            개발자 2, 프로젝트 매니저 1)
                          </li>
                          <li>프론트엔드 개발 (기여도 70%)</li>
                        </ul>
                      </li>
                      <li>
                        <h4>상세 업무</h4>
                        <ul className="list-[square]">
                          <li>계좌이체거래약정서 등록, 관리 기능 개발</li>
                          <li>계좌이체거래약정서 승인 및 반려 기능 개발</li>
                          <li>개인정보 파일 마스킹 보안 모듈 개발</li>
                          <li>레이아웃 설정 및 관리</li>
                        </ul>
                      </li>
                      <li>개발기간 : 2022.08 ~ 2022.12</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {/* 사이드 프로젝트 */}
          <div>
            <h2 className="text-2xl mb-2">사이드 프로젝트</h2>
            <ul className="list-disc space-y-8">
              <li>
                <div>
                  <h3 className="font-semibold text-lg">cakesmate</h3>
                  <p>
                    편하게 베이커리 관련 상품을 주문하고 관리할 수 있는 서비스
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge color="3178C6" label="TypeScript" />
                    <Badge color="61DAFB" label="React" iconColor="black" />
                    <Badge color="FF4154" label="React Query" />
                    <Badge color="EC5990" label="React Hook Form" />
                    <Badge color="b543ac" label="Emotion" />
                  </div>
                  <ul className="list-[circle] mt-2 space-y-4">
                    <li>
                      <h4>역할</h4>
                      <ul className="list-[square]">
                        <li>
                          총 5명 (디자이너 1, 프론트엔드 2, 백엔드 1, 안드로이드
                          1)
                        </li>
                        <li>프론트엔드 개발 (기여도 80%)</li>
                      </ul>
                    </li>
                    <li className="space-y-2">
                      <h4>상세 및 성과</h4>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">프론트엔드</span>
                        <ul className="list-[square]">
                          <li>
                            프로젝트에 필요한 Icon, Stpper, Image, Divider,
                            Chip, Badge 디자인 시스템 컴포넌트 생성
                          </li>
                          <li>
                            전체 ui 레이아웃 및 컴포넌트(header, nav) 구현
                          </li>
                          <li>사용자 웹 전체 퍼블리싱 및 기능 구현</li>
                          <li>debounce를 이용한 실시간 검색 기능</li>
                          <li>
                            업체가 커스텀으로 설정한 주문 옵션 데이터를 ui화
                          </li>
                        </ul>
                      </div>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">기타</span>
                        <ul className="list-[square]">
                          <li>정기적인 회의를 통한 정책, 기능 설정 및 수정</li>
                          <li>
                            다른 역할의 개발자, 디자이너들과의 회의를 통한 개발
                            환경, 방식 구축
                          </li>
                          <li>모노레포와 디자인 시스템에 대한 이해</li>
                          <li>
                            ec2, s3, codeDeploy, docker, github action을 통한
                            배포 및 자동 배포 구현
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div>
                  <h3 className="font-semibold text-lg">
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://blog-lyart-six-70.vercel.app/"
                    >
                      개발 블로그
                    </a>
                  </h3>
                  <p>Next.js, Notion api를 이용한 개발 블로그</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge color="3178C6" label="TypeScript" />
                    <Badge color="000000" label="Next.js" />
                    <Badge color="06B6D4" label="tailwindcss" />
                    <Badge color="000000" label="Notion" />
                  </div>
                  <ul className="list-[circle] mt-2 space-y-4">
                    <li>
                      <h4>역할</h4>
                      <ul className="list-[square]">
                        <li>총 1명 (개인 프로젝트)</li>
                        <li>디자인, 프론트엔드</li>
                      </ul>
                    </li>
                    <li className="space-y-2">
                      <h4>상세 및 성과</h4>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">프론트엔드</span>
                        <ul className="list-[square]">
                          <li>
                            notion api를 이용하여 database, page의 정보를 가져옴
                          </li>
                          <li>
                            notion api에서 제공하는 데이터를 바탕으로 Notion
                            커스텀 컴포넌트 제작
                          </li>
                          <li>Next.js 13의 변경되거나 새로운 기능을 적용</li>
                          <li>새롭게 추가된 ssr, ssg 방식 구현</li>
                        </ul>
                      </div>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">기타</span>
                        <ul className="list-[square]">
                          <li>Next.js 13 Metadata를 이용한 seo 설정</li>
                          <li>google search console을 사용한 seo 설정</li>
                          <li>vercel deploy 기능을 이용한 자동배포</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div>
                  <h3 className="font-semibold text-lg">
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href="http://54.180.17.252:3001/"
                    >
                      주식정보 서비스
                    </a>
                  </h3>
                  <p>한국투자 오픈 api를 이용한 코스피 주식 정보 서비스</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge color="3178C6" label="TypeScript" />
                    <Badge color="61DAFB" label="React" iconColor="black" />
                    <Badge color="DB7093" label="styled components" />
                    <Badge color="FF4154" label="React Query" />
                    <Badge color="000000" label="Express" />
                    <Badge color="3c6fe5" label="apexcharts" />
                    <Badge color="5A29E4" label="Axios" />
                  </div>
                  <ul className="list-[circle] mt-2 space-y-4">
                    <li>
                      <h4>역할</h4>
                      <ul className="list-[square]">
                        <li>총 1명 (개인 프로젝트)</li>
                        <li>디자인, 프론트엔드, 백엔드 개발</li>
                      </ul>
                    </li>
                    <li className="space-y-2">
                      <h4>상세 및 성과</h4>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">프론트엔드</span>
                        <ul className="list-[square]">
                          <li>
                            apex-chart 라이브러리를 사용해 주식 정보를 차트화
                          </li>
                          <li>
                            react query를 사용해 server state를 관리하고 실시간
                            데이터를 관리
                          </li>
                          <li>모바일 반응형 디자인 구현</li>
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <span className="ml-3 text-sm">백엔드</span>
                        <ul className="list-[square]">
                          <li>
                            express를 이용해 한국투자 오픈 api에 연결 및 제공
                          </li>
                        </ul>
                      </div>
                      <div className=" space-y-1">
                        <span className="ml-3 text-sm">기타</span>
                        <ul className="list-[square]">
                          <li>aws ec2와 docker를 이용하여 배포</li>
                          <li>
                            github-action, s3 bucket, codeDeploy를 이용하여
                            자동배포 환경 구성
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {!isMe && (
        <div className="flex justify-end mt-10">
          <button
            onClick={downloadPdf}
            className="font-semibold py-2 px-4 bg-gray-700 text-white dark:bg-gray-100 dark:text-gray-700 rounded-md"
          >
            PDF 다운로드
          </button>
        </div>
      )}
    </div>
  );
}
