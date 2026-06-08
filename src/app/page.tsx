'use client';

import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* 1. 왼쪽 사이드바 영역 */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-2 select-none">
        <div className="font-semibold text-xs text-gray-400 uppercase tracking-wider px-2 mb-2">
          나의 워크스페이스
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-200/70 rounded-md text-sm font-medium cursor-pointer text-gray-700">
          📝 {title || '제목 없음'}
        </div>
      </div>

      {/* 2. 오른쪽 메인 에디터 영역 */}
      <div className="flex-1 overflow-y-auto px-20 py-16 max-w-4xl mx-auto w-full">
        {/* 페이지 제목 입력창 */}
        <input
          type="text"
          placeholder="제목 없음"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold outline-none placeholder-gray-200 mb-8 border-none focus:ring-0"
        />
        
        {/* 본문 내용 입력창 */}
        <textarea
          placeholder="자유롭게 내용을 입력해보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[calc(100vh-250px)] text-lg outline-none resize-none placeholder-gray-200 leading-relaxed border-none focus:ring-0"
        />
      </div>
    </div>
  );
}