const faqs = [
  {
    question: 'Does DeGov governance happen on-chain or off-chain?',
    answer: [
      'The answer is on-chain. DeGov governance is built on top of the OpenZeppelin Governor framework, which is an on-chain governance solution. All proposals, voting, and execution of decisions occur on the blockchain, ensuring transparency and immutability.'
    ]
  },
  {
    question: 'How does DeGov.AI utilize AI capabilities?',
    answer: [
      'The capabilities of AI currently include:',
      '• Explanation of complex proposals in simpler terms with the help of large language models (LLMs).',
      '• A dedicated agent that can accept delegations from DAO members and vote on their behalf before the voting deadline.',
      'You can also learn more about our agent governance here: https://docs.degov.ai/governance/agent/overview'
    ]
  },
  {
    question: "What's the difference between DeGov.AI and Tally?",
    answer: [
      'Both DeGov.AI and Tally are tools that build on top of the OpenZeppelin Governor framework. However, DeGov.AI has been open-source since day one, while Tally is a closed-source product. Additionally, DeGov actively explores the integration of AI capabilities to enhance the governance experience.'
    ]
  },

  {
    question: "What's the difference between DeGov.AI and Snapshot?",
    answer: [
      "DeGov.AI is an on-chain governance solution built on the OpenZeppelin Governor framework, while Snapshot is an off-chain voting platform. That's the main difference."
    ]
  },
  {
    question: 'How can my DAO get support from DeGov.AI?',
    answer: [
      'Check the integration guide here: https://docs.degov.ai/integration/deploy/, and feel free to reach out to us.'
    ]
  }
];

export default function FaqSection() {
  return (
    <section className="flex w-full justify-center bg-black">
      <div className="container flex w-full flex-col gap-20 px-6 pt-24 pb-20 text-white sm:px-10 lg:px-24 lg:pb-24">
        <header className="flex flex-col gap-2.5 text-left">
          <h2 className="text-4xl leading-[54px] font-medium tracking-wide lg:text-6xl lg:leading-[72px]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg leading-8 font-normal text-white/70 lg:text-3xl lg:leading-10">
            Get answers to common questions about Degov.AI and DAO governance
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 text-left lg:grid-cols-2 lg:gap-20">
          {faqs.map((faq) => (
            <article key={faq.question} className="flex flex-col gap-6">
              <h3 className="text-3xl leading-10 font-medium lg:text-[32px]">{faq.question}</h3>
              <div className="flex flex-col gap-3 text-xl leading-7 text-white/70 lg:text-2xl lg:leading-9">
                {faq.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="text-base leading-snug font-normal text-[#979797] lg:text-lg">
          Want to see more FAQs? Check out the full list here:{' '}
          <span className="text-white underline">https://docs.degov.ai/faqs</span>
        </p>
      </div>
    </section>
  );
}
