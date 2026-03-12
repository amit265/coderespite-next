import { Section } from '@/components/motion/Section'

export default function AppsPage() {
  return (
    <Section>
      <h1 className="font-bold text-3xl mb-8 tracking-tighter">Apps</h1>
      <p className="prose prose-neutral dark:prose-invert mb-12">
        I build small Android apps for myself to help with learning and practice. They aren't commercial products, just personal tools.
      </p>
      
      <div className="prose prose-neutral dark:prose-invert">
        <div>
          <h2 className="font-semibold text-xl mb-2">Spaced Repetition Tool</h2>
          <p>An app for practicing concepts using flashcards and spaced repetition. This is what I use to make sure my learning sticks. Not available on the Play Store.</p>
        </div>
      </div>
    </Section>
  )
}
