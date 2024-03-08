import Quotes from "@/data/qotw.json";

const latestQuote = Quotes[0];

function qotw() {
  return (
    <main className="min-h-hero">
      {/* <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        Qoute of The Week
      </h1> */}
      <div className="prose dark:prose-dark">
        <p className="font-semibold text-black dark:text-white md:text-center text-xl">
          &ldquo;{latestQuote.quote}&rdquo;
          {latestQuote.author && `~ ${latestQuote.author}`}
        </p>

        <h2>What is this?</h2>
        <p>
          As of February 2024, I have decided to put up a phrase, question,
          quote, or something to think about for rest of the week. The goal of
          this is to improve my reading habits and hold myself accountable
          publicly.
        </p>
        <p>
          I also wanted to keep a track of some of the cool things I hear in my
          life &mdash; in books, classes, or conversations! My goal is to keep
          one phrase of significance in my mind every week, and be mindful of my
          actions in accordance to it.
        </p>

        <h2>So far</h2>

        {Quotes.map((quote, index) => (
          <p key={index} className="mt-0 mb-3">
            <span className="font-semibold">{quote.date}: </span>
            &nbsp;&ldquo;{quote.quote}&rdquo;{" "}
            {quote.author && `~ ${quote.author}`}
          </p>
        ))}

        {/* <p className="italic mb-0">
          <span className="font-semibold text-white">
            This week&apos;s quote is:
          </span>
        </p> */}
      </div>
    </main>
  );
}

export default qotw;
