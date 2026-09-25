# Arrowfin

1. What part of our stack are you strongest with?  
I am strongest on the backend side. I have extensive experience designing and implementing APIs, managing data flows, and ensuring system reliability and scalability. This is where I feel most confident and where I can contribute the greatest value to the team.

2. What part would be the steepest learning curve?  
The steepest learning curve for me would be adapting to a completely new base programming language if it differs significantly from my current expertise. While I am comfortable learning new frameworks and tools, switching the core language requires deeper adjustment to syntax, paradigms, and ecosystem practices.

3. Any tech not in our stack you consider a core strength?  
Yes, I frequently work with .NET, which I consider one of my core strengths. I have built robust backend solutions using C# and .NET, and I am very familiar with its ecosystem, including API development, microservices, and integration with cloud services.

4. What kind of work do you most want to do day-to-day?  
I enjoy work that challenges me intellectually—projects that involve solving new problems, exploring innovative solutions, or tackling complex technical scenarios. I am motivated by opportunities that push me to think critically and continuously grow my skills.

5. What do you most want to avoid?  
I prefer to avoid repetitive or monotonous tasks that do not add new value or learning opportunities. While I understand that some routine work is necessary, I am most engaged when I can focus on creative problem-solving and building impactful solutions.

Task 4.

First of all, I will not approve the PR. Here are my comments:
There are two different kinds of issues: blockers and should-haves.
Blockers:
Sensitive information is being logged; we should avoid that.
There is no error handling; it should have at least a try/catch.
Should-haves:
The operations should be moved to a service layer.
Validate the string according to the data expected from Prisma.
Improve the logging approach.

Task 5.

13. I’m most proud of the architectural decision to separate responsibilities clearly across layers: controllers remain thin, business logic is handled in services, and data access is isolated through Prisma with tenant scoping. This structure makes the system easier to maintain and test, and it enforces security boundaries. The tradeoff was additional upfront design effort and more complex compared to embedding logic directly in controllers, but the long‑term clarity and scalability justify it.

14. With more time, I would focus on strengthening real‑time resilience—specifically improving reconnection and synchronization strategies for the WebSocket layer. Ensuring that clients always receive a consistent snapshot after reconnecting would reduce the risk of stale data and improve user trust in the system.

15. I would first tell them:

Understand the snapshot endpoint and the tenant isolation model; those are the foundation of the system.

Be mindful of dependency versions—different versions across services (NestJS, Next.js, Prisma, Podman containers) can introduce subtle incompatibilities, so align them carefully.

Keep controllers lean and push logic into services for testability.

I would not let them change the security model: tenant isolation, PII handling, and authentication flow must remain intact. Those guardrails are non‑negotiable. Everything else—UI refinements, performance optimizations, or service refactoring—can evolve, but the security and architectural boundaries must stay solid.

*I have worked with Copilot