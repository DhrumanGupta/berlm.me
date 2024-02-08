import Quotes from "@/data/qotw.json";

const latestQuote = Quotes[0];

function qotw() {
  return (
    <main className="min-h-hero">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Qoute of The Week</h1>
      <div className="prose dark:prose-dark">
        <p>
          As of February 2024, I have decided to put up a quote to refer to
          every day of the week. The goal of this is to improve my reading
          habits and hold myself accountable publicly.
        </p>
        <p>
          I also wanted to keep a track of some of the cool quotes I hear in my
          life &mdash; in books, classes, or conversations!
        </p>

        <p className="italic mb-0">
          <span className="font-semibold text-white">
            This week&apos;s quote is:
          </span>
        </p>
        <p>
          &ldquo;{latestQuote.quote}&rdquo; ~ {latestQuote.author}
        </p>
      </div>
    </main>
  );
}

export default qotw;
