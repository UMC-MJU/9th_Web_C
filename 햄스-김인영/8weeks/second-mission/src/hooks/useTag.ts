import { useState } from "react";

export function useTags(initialTags: string[] = []) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState("");

  //태그 추가
  const addTag = () => {
    const trimmed = input.trim(); //공백 제거
    if (trimmed && !tags.includes(trimmed)) { //중복 방지!
      setTags((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  //태그 삭제
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  //태그 초기화
  const resetTags = (newTags: string[]) => {
    setTags(newTags);
    setInput("");
  };

  

  return {
    tags,
    input,
    setInput,
    addTag,
    removeTag,
    resetTags
  };
}
