import { useMutation, useQueryClient } from '@tanstack/react-query';
import record from '../../assets/lp-record.png'
import { useForm } from 'react-hook-form';
import { postLp } from '../../apis/lp';
import type { CreateLp } from '../../types/lp';
import { uploadImagePublic } from '../../apis/image';
import { useTags } from '../../hooks/useTag';

type LpRegisterModalProps = {
  onClose: () => void;
};

type LpFormFields = {
  title: string;
  content: string;
  thumbnail: FileList;
};

export const LpRegisterModal = ({onClose}: LpRegisterModalProps) => {
  const queryClient = useQueryClient();

  //tag는 따로 useTags로 관리
  const { tags, input, setInput, addTag, removeTag, resetTags } = useTags();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LpFormFields>({
    defaultValues: { title: "", content: "" },
  });

  const { mutate } = useMutation({
    mutationFn: (LpData : CreateLp) => postLp(LpData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
      reset();
      resetTags();
      onClose();
    },
    onError: (error) => {
      console.error("LP 등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = async (data: LpFormFields) => {
    try {
      let thumbnailUrl = "";
      if (data.thumbnail && data.thumbnail.length > 0) {
        const file = data.thumbnail[0];
        thumbnailUrl = await uploadImagePublic(file);
      }

      const LpData: CreateLp = {
        title: data.title,
        content: data.content,
        thumbnail: thumbnailUrl,
        tags,
        published: true,
      };

      mutate(LpData);
    } catch (err) {
      console.error("에러:", err);
      alert("LP 등록 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 translate-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <button
          onClick={onClose}
          className="text-blue-500 text-4xl -translate-y-2"
        >
          ×
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label className="flex flex-col items-center cursor-pointer mt-2">
            <img src={record} className="w-[250px] pb-3" alt="record" />
            <input
              type="file"
              {...register("thumbnail", { required: "이미지를 업로드해주세요." })}
              className="hidden"
            />
          </label>

          <input
            type="text"
            placeholder="LP Name"
            {...register("title", { required: "이름을 입력해주세요." })}
            className="border border-gray-300 rounded-md p-2 text-sm h-10 bg-gray-100"
          />

          <textarea
            placeholder="LP Content"
            {...register("content", { required: "설명을 입력해주세요." })}
            className="border border-gray-300 rounded-md p-2 text-sm resize-none h-10 bg-gray-100"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="LP Tag"
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm h-10 bg-gray-100"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => ( 
              //react가 useTags 안의 tag state가 바뀐 것을 감지 -> 자동 재랜더링, map 재실행
              <span
                key={tag}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-400 disabled:opacity-50"
          >
            {isSubmitting ? "Adding LP..." : "Add LP"}
          </button>
        </form>
      </div>
    </div>
  )
}
