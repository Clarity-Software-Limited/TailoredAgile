const catalogItems = [
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
  }
];
