import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'popup' | 'info' | 'media' | 'chatbot'>('popup');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage school information, media, and AI counselor settings.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('popup')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'popup'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-bell w-6"></i>
                긴급 팝업 및 공지
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'info'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-school w-6"></i>
                학교 기본 정보
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'media'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-photo-film w-6"></i>
                미디어 및 서류
              </button>
              <button
                onClick={() => setActiveTab('chatbot')}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === 'chatbot'
                    ? 'bg-[#E11D48] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fa-solid fa-robot w-6"></i>
                AI 챗봇 설정
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 bg-white">
            {activeTab === 'popup' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">긴급 팝업 관리</h2>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900">팝업 활성화</h3>
                    <p className="text-sm text-gray-500">메인 페이지에서 방문자에게 긴급 팝업을 표시합니다.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#E11D48]"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">공지 제목</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="예: 악천후로 인한 휴교 공지" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">상세 내용</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="공지할 내용을 상세히 적어주세요."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">첨부 이미지 URL (선택)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="이미지 링크 주소" />
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">저장하기</button>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">학교 기본 정보 (AI 학습용)</h2>
                  <p className="text-gray-600 mb-6">여기에 입력된 정보는 앱의 AI 챗봇(AI Counselor)이 참조하여 학부모/학생들의 질문에 정확하게 답변할 수 있게 돕습니다.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">학비 안내 (Tuition & Fees)</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="학년별 학비, 납부 기간 등" defaultValue="유치부: 연간 3,000,000 KRW&#10;초등부: 연간 4,500,000 KRW"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">입학 절차 요약 (Admission Process)</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="입학 절차 단계별 설명" defaultValue="1. 입학원서 제출 및 서류심사&#10;2. 학생 인터뷰 및 레벨 테스트&#10;3. 학부모 면담&#10;4. 최종 합격 통보 및 등록금 납부"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">주요 커리큘럼 특징 (Curriculum)</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="학교의 특화된 커리큘럼" defaultValue="성경적 세계관을 바탕으로 한 이중언어(영어/한국어) 교육. 프로젝트 기반 학습(PBL) 및 창의적 인성 교육 실시."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">자주 묻는 질문 (FAQ Data)</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Q/A 형식으로 작성" defaultValue="Q: 통학 버스가 있나요?&#10;A: 네, 주요 지역(안티폴로, 마닐라 등)으로 통학 버스를 운행하고 있습니다."></textarea>
                  </div>
                </div>

                <div className="pt-4 text-right">
                   <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">데이터 업데이트 (AI 동기화)</button>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">미디어 및 서류 관리</h2>
                </div>

                {/* Photos */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📸 최근 사진 업로드</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer">
                    <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-600 font-medium">클릭하거나 사진 파일을 여기로 드래그하세요.</p>
                    <p className="text-xs text-gray-400 mt-1">지원 형식: JPG, PNG, WEBP (최대 5MB)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {/* Placeholder images */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                        <img src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop`} alt="School" className="w-full h-full object-cover" />
                         <button className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition shadow hover:bg-red-600">
                           <i className="fa-solid fa-trash text-sm"></i>
                         </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PDFs */}
                <div className="mb-8 border-t pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📄 학부모용 문서/서류 업로드</h3>
                  <div className="border border-gray-200 rounded-xl divide-y">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-xl">
                       <span className="font-bold text-gray-700 text-sm">현재 등록된 문서</span>
                       <button className="text-[#E11D48] text-sm font-bold hover:underline"><i className="fa-solid fa-plus mr-1"></i> 새 문서 추가</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex items-center text-gray-700">
                        <i className="fa-regular fa-file-pdf text-red-500 text-xl mr-3"></i>
                        <span>2026학년도_입학원서.pdf</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex items-center text-gray-700">
                         <i className="fa-regular fa-file-pdf text-red-500 text-xl mr-3"></i>
                         <span>학사_일정(Calendar).pdf</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">AI 챗봇 설정</h2>
                </div>

                <div className="space-y-6">
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">환영 인사말 (Welcome Message)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" defaultValue="안녕하세요! LSCS AI 교육 상담원입니다. 입학이나 학교 생활에 대해 궁금항 점을 물어보세요!" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-3">상담원 말투 / 페르소나 설정 (Tone & Persona)</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="border-2 border-red-500 bg-red-50/30 p-4 rounded-xl cursor-pointer flex items-start">
                          <input type="radio" name="tone" className="mt-1 mr-3 text-red-600 focus:ring-red-500" defaultChecked />
                          <div>
                            <span className="block font-bold text-gray-900">친절하고 상냥한 톤</span>
                            <span className="text-sm text-gray-500 mt-1 block">초등학교 교사처럼 따뜻하고 이해하기 쉬운 이모티콘을 포함한 말투😊</span>
                          </div>
                        </label>
                        <label className="border border-gray-200 hover:border-red-300 p-4 rounded-xl cursor-pointer flex items-start transition">
                          <input type="radio" name="tone" className="mt-1 mr-3 text-red-600 focus:ring-red-500" />
                          <div>
                             <span className="block font-bold text-gray-900">전문적인 입학사정관 톤</span>
                             <span className="text-sm text-gray-500 mt-1 block">정확한 정보 전달을 우선시하는 깔끔하고 정제된 말투.</span>
                          </div>
                        </label>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1">챗봇 활성화 (웹사이트 표출 여부)</label>
                     <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
                        <option>항상 표시 (우측 하단)</option>
                        <option>입학 시즌에만 팝업 표시</option>
                        <option>비활성화 (가리기)</option>
                     </select>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button className="bg-[#E11D48] text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">설정 저장</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
