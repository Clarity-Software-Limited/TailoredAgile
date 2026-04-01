const catalogItems = [
  {
    id: "change-advisory-board",
    name: "Change Advisory Board",
    type: "Governance",
    description: "Structured review forum for assessing production-impacting changes.",
    overview:
      "A Change Advisory Board (CAB) is a cross-functional forum that reviews significant changes to production systems for risk, readiness, and timing.",
    good:
      "Improves risk visibility, aligns stakeholders on rollout plans, and helps teams coordinate communication for high-impact changes.",
    bad:
      "If every change requires CAB review, approval queues grow and teams slow down even when risk is low or well understood.",
    ugly:
      "Overly rigid CAB processes can become theater that delays delivery, encourages workaround behavior, and weakens ownership at team level."
  },
  {
    id: "story-points",
    name: "Story Points",
    type: "Planning",
    description: "Relative sizing to estimate delivery effort and uncertainty.",
    overview:
      "Story points are a relative estimation technique used to compare effort, complexity, and risk across backlog items rather than predicting exact time.",
    good:
      "Helps teams compare work consistently, improve forecast conversations, and focus on uncertainty instead of pretending estimates are exact.",
    bad:
      "Teams sometimes treat points like hours, compare velocity between teams, or use points for individual performance scoring, which distorts behavior.",
    ugly:
      "When leadership ties points directly to output quotas, teams inflate estimates, game metrics, and lose trust, resulting in poor planning and lower product quality."
  },
  {
    id: "time-based-estimation",
    name: "Time Based Estimation",
    type: "Planning",
    description: "Estimate work in hours or days for explicit time expectations.",
    overview:
      "Time based estimation predicts how long work may take using hours or days, often to support planning, sequencing, and delivery forecasts.",
    good:
      "Useful when teams need straightforward timelines, external coordination, or budget planning tied directly to expected effort windows.",
    bad:
      "Estimates can be treated as fixed commitments, even when uncertainty is high and new information changes the true effort required.",
    ugly:
      "When time estimates are used as promises for individual accountability, teams pad numbers, hide risk, and lose trust in planning outcomes."
  },
  {
    id: "critical-path-planning",
    name: "Critical Path Planning",
    type: "Planning",
    description: "Sequence dependent work to identify the longest delivery path.",
    overview:
      "Critical path planning maps task dependencies to find the chain of activities that determines the earliest possible completion date.",
    good:
      "Improves schedule visibility for complex initiatives, highlights dependency risk, and helps teams focus on work that most affects delivery timing.",
    bad:
      "Plans can become brittle if task durations are overly optimistic or if changing dependencies are not updated regularly.",
    ugly:
      "When treated as a fixed command-and-control schedule, teams hide delays and local constraints, causing late surprises and lower delivery trust."
  },
  {
    id: "product-breakdown-structure",
    name: "Product Breakdown Structure",
    type: "Backlog",
    description: "Decompose the product into structured deliverable components.",
    overview:
      "A product breakdown structure organizes the product into hierarchical parts so teams can understand scope, ownership, and planning boundaries.",
    good:
      "Clarifies scope early, reduces ambiguity across teams, and supports cleaner planning conversations around deliverables and integration points.",
    bad:
      "If decomposition is too rigid, teams can optimize component completion over end-to-end customer outcomes.",
    ugly:
      "Overly detailed structures can become bureaucratic artifacts that are expensive to maintain and disconnected from real delivery flow."
  },
  {
    id: "bike-shedding",
    name: "Bike Shedding",
    type: "Collaboration",
    antiPattern: true,
    description: "Spending disproportionate effort on trivial decisions.",
    overview:
      "Bike shedding happens when teams focus heavily on easy, low-impact topics while difficult, high-impact decisions are delayed or avoided.",
    good:
      "A brief discussion on simple details can sometimes surface useful context, uncover assumptions, and include voices that might otherwise be missed.",
    bad:
      "When unchecked, trivial debates consume planning time, drain energy, and push meaningful delivery decisions further down the line.",
    ugly:
      "Persistent bike shedding erodes trust, blocks momentum, and creates a culture where appearance-level decisions consistently outweigh customer value."
  },
  {
    id: "toxic-positivity",
    name: "Toxic Positivity",
    type: "Collaboration",
    antiPattern: true,
    description: "Avoiding hard truths by forcing optimism in all discussions.",
    overview:
      "Toxic positivity appears when teams suppress concerns, risks, or negative feedback in favor of constant optimism, even when problems need direct attention.",
    good:
      "A constructive and hopeful tone can help teams stay resilient during setbacks and maintain momentum through uncertainty.",
    bad:
      "When optimism replaces honest discussion, risks go unspoken, valid concerns get dismissed, and teams lose opportunities to learn early.",
    ugly:
      "At its worst, toxic positivity creates psychological unsafety where people hide issues, defects escalate, and trust breaks down across the team."
  },
  {
    id: "product-flow-diagram",
    name: "Product Flow Diagram",
    type: "Discovery",
    description: "Visualize how users and data move through the product experience.",
    overview:
      "A product flow diagram maps key user steps, system interactions, and decision points to make the product journey explicit before implementation.",
    good:
      "Aligns product, design, and engineering quickly, reveals missing states, and helps teams reason about edge cases earlier.",
    bad:
      "Diagrams can become outdated when teams iterate quickly without updating the source of truth.",
    ugly:
      "If used as a one-off artifact instead of a living model, teams build divergent interpretations that cause rework and inconsistent experiences."
  },
  {
    id: "stories",
    name: "Stories",
    type: "Backlog",
    description: "Outcome-focused work items for customer and team alignment.",
    overview:
      "Stories describe small slices of user value with clear intent, context, and acceptance criteria so teams can deliver in meaningful increments.",
    good:
      "Creates shared understanding of customer outcomes, supports better discovery conversations, and keeps delivery focused on value over tasks.",
    bad:
      "Stories are often written as technical to-dos with no user context, making work look agile while still operating like a task factory.",
    ugly:
      "Poorly defined stories create churn, rework, and missed expectations, causing teams to ship low-value changes while stakeholders lose confidence."
  },
  {
    id: "two-week-iterations",
    name: "Two-Week Iterations",
    type: "Cadence",
    description: "Fast feedback loops with regular planning and review cycles.",
    overview:
      "Two-week iterations provide a short planning and delivery rhythm designed to balance focus, adaptability, and regular feedback.",
    good:
      "Encourages frequent review, rapid learning, and predictable checkpoints that help teams adjust scope before risks become expensive.",
    bad:
      "Teams sometimes force all work to fit arbitrary sprint boundaries, creating rushed handoffs or splitting work in unnatural ways.",
    ugly:
      "If teams are judged solely on sprint commitment, they avoid innovation, hide risk, and optimize for optics instead of sustainable outcomes."
  },
  {
    id: "three-week-iterations",
    name: "Three-Week Iterations",
    type: "Cadence",
    description: "Slightly longer windows for larger batch delivery.",
    overview:
      "Three-week iterations give teams more runway for complex work while still preserving a recurring inspect-and-adapt cycle.",
    good:
      "Useful when work has meaningful setup costs, dependencies, or deep engineering tasks that need more uninterrupted flow.",
    bad:
      "Longer cycles can reduce urgency around feedback, and teams may defer validation until late in the iteration.",
    ugly:
      "When used as a shield against stakeholder visibility, problems stay hidden for weeks and failed assumptions become expensive to unwind."
  },
  {
    id: "kanban",
    name: "Kanban",
    type: "Delivery",
    description: "Visualize flow, limit WIP, and improve delivery predictability.",
    overview:
      "Kanban is a flow-based method that helps teams make work visible, manage work-in-progress limits, and continuously improve throughput and cycle time.",
    good:
      "Creates shared visibility, exposes bottlenecks early, and supports steady delivery improvements without forcing fixed-length iteration boundaries.",
    bad:
      "Without clear policies and explicit WIP limits, boards can become status dashboards that track activity but do not improve flow outcomes.",
    ugly:
      "If Kanban is used only as reporting theater, teams overload in-progress work, delay feedback, and normalize chronic blocked items."
  },
  {
    id: "big-room-planning",
    name: "Big Room Planning",
    type: "Planning",
    description: "Align teams together on goals, dependencies, and delivery plans.",
    overview:
      "Big room planning brings multiple teams together to align priorities, surface dependencies, and build a shared short-term delivery plan.",
    good:
      "Improves cross-team alignment, reveals delivery risks early, and builds shared ownership of outcomes and constraints.",
    bad:
      "Planning events can become heavy and inefficient if preparation is weak or decision-making authority is unclear.",
    ugly:
      "When treated as performative ceremony, teams leave with unrealistic commitments, hidden conflicts, and little real coordination."
  },
  {
    id: "continuous-deployment",
    name: "Continuous Deployment",
    type: "Delivery",
    description: "Release validated changes to production automatically.",
    overview:
      "Continuous deployment automatically ships every change that passes the delivery pipeline, enabling very fast release cadence.",
    good:
      "Reduces release friction, shortens time-to-value, and allows teams to validate product decisions quickly with real-world feedback.",
    bad:
      "Without strong observability and feature controls, frequent releases can overwhelm teams and make incidents harder to diagnose.",
    ugly:
      "Deploying continuously with weak tests and no safety nets can create repeated customer-facing failures, operational burnout, and emergency rollback culture."
  },
  {
    id: "continuous-integration",
    name: "Continuous Integration",
    type: "Engineering",
    description: "Merge often and test often to reduce integration risk.",
    overview:
      "Continuous integration is the practice of frequently merging code into a shared branch and validating it with automated checks.",
    good:
      "Finds integration issues early, keeps codebases healthier, and reduces painful late-stage merge conflicts.",
    bad:
      "Some teams run only superficial checks, so CI appears healthy while deeper integration problems still accumulate.",
    ugly:
      "If flaky pipelines and broken main branches are tolerated, developers stop trusting automation, bypass safeguards, and regress quality at scale."
  },
  {
    id: "automated-regression-testing",
    name: "Automated Regression Testing",
    type: "Quality",
    description: "Protect features with repeatable checks against breakage.",
    overview:
      "Automated regression testing verifies that existing behavior still works after code changes, reducing accidental breakage.",
    good:
      "Increases confidence to refactor, accelerates releases, and helps detect defects before users are impacted.",
    bad:
      "Overly brittle or duplicated tests create noise and maintenance burden, slowing teams without improving confidence proportionally.",
    ugly:
      "Large unstable test suites can block delivery, train teams to ignore failures, and let real defects slip into production anyway."
  },
  {
    id: "behavior-driven-development",
    name: "BDD",
    type: "Patterns and Practices",
    description: "Define behavior collaboratively with examples before building.",
    overview:
      "Behavior Driven Development aligns product, engineering, and quality around shared scenarios that describe expected system behavior.",
    good:
      "Improves shared understanding, reduces ambiguity in acceptance criteria, and creates stronger traceability from intent to automated checks.",
    bad:
      "If scenarios become verbose or disconnected from real user outcomes, teams maintain extra ceremony without gaining clarity.",
    ugly:
      "When BDD is treated as documentation theater, teams write brittle scripts, miss core behaviors, and still ship misunderstood features."
  },
  {
    id: "test-driven-development",
    name: "TDD",
    type: "Patterns and Practices",
    description: "Write a failing test first, then implement the minimum code.",
    overview:
      "Test Driven Development uses a red-green-refactor loop where tests drive design decisions and code evolves in small validated steps.",
    good:
      "Encourages better design boundaries, faster feedback, and safer refactoring by proving behavior continuously during implementation.",
    bad:
      "Teams new to TDD can overfocus on test mechanics, producing brittle tests that mirror implementation details instead of behavior.",
    ugly:
      "When rushed or misunderstood, TDD degrades into checkbox testing that adds drag, misses integration risk, and undermines trust in coverage."
  },
  {
    id: "specification-by-example",
    name: "Specification by Example",
    type: "Patterns and Practices",
    description: "Capture requirements as concrete examples of expected behavior.",
    overview:
      "Specification by Example turns requirements into concrete examples that become a shared reference for design, development, and testing.",
    good:
      "Builds common language across roles, exposes assumptions early, and helps teams validate outcomes against realistic examples.",
    bad:
      "Examples can become stale if they are not maintained alongside evolving product behavior and domain rules.",
    ugly:
      "Poorly chosen examples can create false confidence, hide edge cases, and drive teams toward narrow implementations that miss customer needs."
  }
];
