interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="flex flex-col gap-[24px]">
      <h4 className="text-[32px] font-normal leading-[130%]">{question}</h4>
      <p className="text-[24px] font-normal leading-[130%] opacity-70">
        {answer}
      </p>
    </div>
  );
}
