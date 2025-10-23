const lessonsData = [
  {
    title: "Lemonade Stand Basics",
    difficulty: "Beginner • 20 minutes • +10 XP",
    xp: 10,
    quest: "Run your lemonade stand for 10 in-game days!",
    badge: "Lemonade Tycoon",
    challengeType: "multi-sim",
    rewards: { coins: 100, items: ["Business License"] },
    completed: false, 
    content: `
      <h3>What is a business?</h3>
      <p>A business is when you make or sell something people want, and they give you money for it. Even a lemonade stand is a business!</p>

      <h3>Costs vs. revenue</h3>
      <p>To make lemonade, you buy lemons, sugar, and cups. These are <strong>costs</strong>. When you sell lemonade, the money you get is <strong>revenue</strong>.</p>

      <h3>Profit</h3>
      <p>Profit is what’s left after costs. If you spend $5 on supplies and sell lemonade for $10, your profit is $5.</p>

      <h3>Pricing and demand</h3>
      <p>Lower prices can bring more customers, but too low hurts profit. Higher prices earn more per cup, but might scare customers away. Find the balance!</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Run your stand for 10 days. Set price, choose cups, and react to events to grow profit and satisfaction.</p>
    `
  },
  {
    title: "Money 101",
    difficulty: "Beginner • 20 minutes • +15 XP",
    xp: 15,
    quest: "Sort activities into Earn, Save, Spend.",
    badge: "Money Starter",
    challengeType: "dragdrop",
    rewards: { coins: 70, items: ["Piggy Bank"] },
    completed: false,
    content: `
      <h3>What is money?</h3>
      <p>Money is a tool people use to trade. Instead of swapping items directly, we use coins and bills everyone agrees have value.</p>

      <h3>Earn, save, spend</h3>
      <ul>
        <li><strong>Earn:</strong> Get money by working or selling.</li>
        <li><strong>Save:</strong> Keep money for later goals and emergencies.</li>
        <li><strong>Spend:</strong> Use money to buy things you need or want.</li>
      </ul>

      <h3>Example</h3>
      <p>You earn $10 mowing lawns, save $4 for a toy, and spend $6 on a treat. That’s healthy money management.</p>

      <h3>Habits that help</h3>
      <p>Always save a part of what you earn, budget what you spend, and look for smart ways to earn.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Sort actions into Earn, Save, or Spend.</p>
    `
  },
  {
    title: "Marketing Magic",
    difficulty: "Intermediate • 25 minutes • +20 XP",
    xp: 20,
    quest: "Create a catchy slogan!",
    badge: "Marketing Whiz",
    challengeType: "creative",
    rewards: { coins: 100, items: ["Poster Kit", "Social Media Boost"] },
    completed: false,
    content: `
      <h3>What is marketing?</h3>
      <p>Marketing helps people discover your business and want to try it. It includes slogans, posters, ads, and word of mouth.</p>

      <h3>Know your audience</h3>
      <p>Think about who you’re talking to. Kids might like fun words; parents may care about health or value.</p>

      <h3>Make it memorable</h3>
      <p>Great slogans are short, clear, and catchy. Use rhythm, rhyme, or strong words that fit your brand.</p>

      <h3>Example</h3>
      <p>“Sunny Sips: Fresh, sweet, and cool!” It’s short, positive, and says what makes you special.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Write a slogan and test how catchy it is.</p>
    `
  },
  {
    title: "Build Your Brand",
    difficulty: "Beginner • 30 minutes • +15 XP",
    xp: 15,
    quest: "Design a logo and name.",
    badge: "Brand Builder",
    challengeType: "creative",
    rewards: { coins: 80, items: ["Logo Kit", "Color Palette"] },
    completed: false,
    content: `
      <h3>What is a brand?</h3>
      <p>Your brand is how people recognize and feel about your business. It includes your name, logo, colors, and style.</p>

      <h3>Consistency matters</h3>
      <p>Use the same colors, fonts, and tone everywhere. Consistency builds trust and makes you memorable.</p>

      <h3>Choose colors wisely</h3>
      <p>Colors create feelings: yellow feels sunny and cheerful; blue feels calm and trustworthy.</p>

      <h3>Example</h3>
      <p>“Sunny Sips” with a smiley lemon and bright yellow makes your stand feel friendly and fun.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Pick a name and color to create your brand card.</p>
    `
  },
  {
    title: "Customer Service Secrets",
    difficulty: "Beginner • 20 minutes • +15 XP",
    xp: 15,
    quest: "Handle a tricky customer.",
    badge: "Service Star",
    challengeType: "quiz",
    rewards: { coins: 70, items: ["Smile Badge", "Customer Journal"] },
    completed: false,
    content: `
      <h3>Serve with empathy</h3>
      <p>Customer service is how you treat people who buy from you. Listening and caring make customers happy and loyal.</p>

      <h3>Simple steps</h3>
      <ul>
        <li><strong>Listen:</strong> Let them explain the problem.</li>
        <li><strong>Apologize:</strong> Be kind and own it.</li>
        <li><strong>Fix:</strong> Offer a replacement, refund, or solution.</li>
      </ul>

      <h3>Example</h3>
      <p>“This lemonade is too sour.” You say, “I’m sorry! I’ll make a sweeter batch or offer a refund.”</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Pick the best response in a service scenario.</p>
    `
  },
  {
    title: "Profit vs. Costs",
    difficulty: "Beginner • 15 minutes • +10 XP",
    xp: 10,
    quest: "Calculate profit correctly.",
    badge: "Money Master",
    challengeType: "quiz",
    rewards: { coins: 50, items: ["Calculator", "Budget Sheet"] },
    completed: false,
    content: `
      <h3>The profit formula</h3>
      <p><strong>Profit = Revenue – Costs</strong>. Revenue is money you earn from selling; costs are what you spend to make and sell.</p>

      <h3>Track carefully</h3>
      <p>List all costs (supplies, signs, cups). Small items add up and change your real profit.</p>

      <h3>Example</h3>
      <p>Sell 20 cups at $2 → $40 revenue. Supplies cost $15 → $25 profit.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Solve quick profit questions to check your understanding.</p>
    `
  },
  {
    title: "Pitch Your Idea",
    difficulty: "Intermediate • 25 minutes • +20 XP",
    xp: 20,
    quest: "Present your idea with confidence.",
    badge: "Pitch Pro",
    challengeType: "creative",
    rewards: { coins: 100, items: ["Microphone", "Pitch Deck"] },
    completed: false,
    content: `
      <h3>What is a pitch?</h3>
      <p>A pitch is a short talk that explains your idea clearly and shows why it matters.</p>

      <h3>Structure</h3>
      <ul>
        <li><strong>Hook:</strong> Grab attention fast.</li>
        <li><strong>Problem:</strong> What need are you solving?</li>
        <li><strong>Solution:</strong> Your product/service.</li>
        <li><strong>Why you:</strong> What makes you unique.</li>
      </ul>

      <h3>Example</h3>
      <p>“Sunny Sips solves boring drinks with fresh, honey‑sweet lemonade. It’s healthier and tastes amazing.”</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Write a short pitch (3–4 sentences) and submit.</p>
    `
  },
  {
    title: "Teamwork & Leadership",
    difficulty: "Intermediate • 30 minutes • +20 XP",
    xp: 20,
    quest: "Lead your team wisely.",
    badge: "Team Captain",
    challengeType: "scenario",
    rewards: { coins: 90, items: ["Leadership Badge"] },
    completed: false,
    content: `
      <h3>Lead the process, not just the people</h3>
      <p>Leadership helps a group work together. Good leaders listen, plan, and help others shine.</p>

      <h3>Team basics</h3>
      <ul>
        <li><strong>Clear roles:</strong> Everyone knows their job.</li>
        <li><strong>Communication:</strong> Share updates and problems.</li>
        <li><strong>Respect:</strong> Encourage and support each other.</li>
      </ul>

      <h3>Example</h3>
      <p>Conflict over tasks? Hold a quick meeting, assign roles fairly, and agree on a plan.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Choose the best leadership action in a scenario.</p>
    `
  },
  {
    title: "Creativity Challenge",
    difficulty: "Beginner • 20 minutes • +15 XP",
    xp: 15,
    quest: "Solve a random problem creatively.",
    badge: "Idea Machine",
    challengeType: "creative",
    rewards: { coins: 60, items: ["Lightbulb Badge"] },
    completed: false,
    content: `
      <h3>Creativity is problem‑solving</h3>
      <p>Creativity isn’t just art; it’s finding new ways to solve problems and improve ideas.</p>

      <h3>Think differently</h3>
      <ul>
        <li><strong>Combine:</strong> Mix two ideas.</li>
        <li><strong>Flip:</strong> Try the opposite approach.</li>
        <li><strong>Simplify:</strong> Remove steps to make it easier.</li>
      </ul>

      <h3>Example</h3>
      <p>Rainy day? Sell warm lemon tea or deliver cups to nearby homes.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Read a prompt and type your creative solution.</p>
    `
  },
  {
    title: "Budgeting Basics",
    difficulty: "Beginner • 25 minutes • +15 XP",
    xp: 15,
    quest: "Plan your spending wisely.",
    badge: "Budget Boss",
    challengeType: "simulation",
    rewards: { coins: 70, items: ["Budget Planner"] },
    completed: false,
    content: `
      <h3>What is a budget?</h3>
      <p>A budget is a simple plan for how you’ll use your money. It helps you reach goals and avoid running out.</p>

      <h3>The three buckets</h3>
      <ul>
        <li><strong>Needs:</strong> Must‑haves (supplies).</li>
        <li><strong>Wants:</strong> Nice‑to‑haves (posters).</li>
        <li><strong>Savings:</strong> Future goals and surprises.</li>
      </ul>

      <h3>Example</h3>
      <p>If you have $100, you might use $50 for needs, $30 for wants, and save $20 for next week.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Allocate $100 across needs, wants, and savings.</p>
    `
  },
  {
    title: "Social Media Starter",
    difficulty: "Intermediate • 30 minutes • +20 XP",
    xp: 20,
    quest: "Create a post that gets engagement.",
    badge: "Social Starter",
    challengeType: "creative",
    rewards: { coins: 90, items: ["Phone Upgrade"] },
    completed: false,
    content: `
      <h3>Share, don’t spam</h3>
      <p>Social media helps people discover your business. Good posts are helpful, fun, or inspiring—never just “buy now!”</p>

      <h3>Make engaging posts</h3>
      <ul>
        <li><strong>Hook:</strong> Start with something interesting.</li>
        <li><strong>Value:</strong> Share tips, stories, or news.</li>
        <li><strong>CTA:</strong> Invite a simple action (visit, comment).</li>
      </ul>

      <h3>Example</h3>
      <p>“Hot day? Cool down with Sunny Sips! Fresh lemons, local honey—open till 5pm.”</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Write a caption and choose a style to see your engagement score.</p>
    `
  },
  {
    title: "From Idea to Prototype",
    difficulty: "Intermediate • 35 minutes • +25 XP",
    xp: 25,
    quest: "Turn your idea into a prototype.",
    badge: "Inventor",
    challengeType: "dragdrop",
    rewards: { coins: 120, items: ["Prototype Kit"] },
    completed: false,
    content: `
      <h3>What is a prototype?</h3>
      <p>A prototype is a first version of your idea you can test and improve. It’s quick, simple, and built to learn.</p>

      <h3>Build fast, learn fast</h3>
      <p>Don’t wait for perfect. Make a small version, show it to people, and note what to improve.</p>

      <h3>Example</h3>
      <p>Want a cup holder? Make one from cardboard first. If people like it, later upgrade the material.</p>

      <h3>Now try it</h3>
      <p><strong>Mini‑Game:</strong> Pick parts to assemble a product summary.</p>
    `
  }
];
