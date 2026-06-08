'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

//  새로운 치트키 코드 (여기로 덮어씌워 주세요!)
const supabaseUrl = 'https://kzyqouohgrqlqpwnehzf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eXFvdW9oZ3JxbHFwd25laHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MjU3NjEsImV4cCI6MjA5NjIwMTc2MX0.0XOFLlvl95b7vF5JYQWtUsc3t01BYstkEebO4MiKRao';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [docId, setDocId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchDocument() {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setDocId(data[0].id);
        setTitle(data[0].title || '');
        setContent(data[0].content || '');
      }
    }
    fetchDocument();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    if (docId) {
      // 수정할 때 에러가 나면 알려줌
      const { error } = await supabase
        .from('documents')
        .update({ title, content })
        .eq('id', docId);

      if (error) {
        alert('❌ 수정 실패: ' + error.message);
      } else {
        alert('수파베이스에 안전하게 수정되었습니다! 🎉');
      }
    } else {
      // 처음 저장할 때 에러가 나면 알려줌
      const { data, error } = await supabase
        .from('documents')
        .insert([{ title, content }])
        .select();

      if (error) {
        alert('❌ 저장 실패: ' + error.message);
        console.error(error);
      } else if (data && data.length > 0) {
        setDocId(data[0].id);
        alert('수파베이스 클라우드에 안전하게 첫 저장되었습니다! 🎉');
      }
    }

    setIsSaving(false);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-2 select-none">
        <div className="font-semibold text-xs text-gray-400 uppercase tracking-wider px-2 mb-2">
          나의 워크스페이스
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-200/70 rounded-md text-sm font-medium cursor-pointer text-gray-700">
          📝 {title || '제목 없음'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-20 py-16 max-w-4xl mx-auto w-full relative">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="absolute top-8 right-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          {isSaving ? '저장 중...' : '구름에 저장 ☁️'}
        </button>

        <input
          type="text"
          placeholder="제목 없음"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold outline-none placeholder-gray-200 mb-8 border-none focus:ring-0"
        />
        
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