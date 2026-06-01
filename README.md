\# Zero-Flakiness Agent | Autonomous Self-Healing Playwright Wrapper



An enterprise-grade wrapper engineered to eliminate brittle frontend selector failures across web automation test suites. By intercepting standard runtime timeout exceptions, the agent automatically captures relevant DOM execution snapshots, queries Claude's API for real-time selector optimization, and resumes execution seamlessly.



\## 🚀 Key Framework Objectives

\* \*\*Zero Flaky Interceptions:\*\* Dynamically switches out broken CSS/XPath selectors for resilient, user-facing locators on the fly.

\* \*\*Abstracted Reliability:\*\* No changes required to base test structures; logic handles heals automatically behind a standard utility abstraction.

\* \*\*Optimized API Overhead:\*\* Truncates DOM evaluation contexts to minimize token usage while maintaining precise runtime context.



\## 🛠️ Initial Installation



```bash

npm install

