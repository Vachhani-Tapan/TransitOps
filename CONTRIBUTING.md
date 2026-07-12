# Contributing to TransitOps

First off, thank you for contributing to TransitOps! As a Smart Transport Operations Platform built for efficiency and correctness, we maintain high standards for code quality, architectural consistency, and team alignment.

Please read through the guidelines below before starting your development work.

## Branch Naming Conventions

All development must be performed in branch isolations. Use the following prefix conventions when naming branches:

- **`feature/`**: For new capabilities or business rules (e.g., `feature/dispatch-rules`, `feature/driver-registry`).
- **`bugfix/`**: For resolving issues or errors in active code (e.g., `bugfix/license-validation-timezone`).
- **`docs/`**: For documentation improvements (e.g., `docs/architecture-mermaid-update`).
- **`refactor/`**: For architectural cleanup or structural modifications that don't add features (e.g., `refactor/express-routing`).
- **`test/`**: For additions or fixes to the test suites (e.g., `test/maintenance-triggers`).
- **`chore/`**: For package updates, configs, or build scripts (e.g., `chore/prisma-schema-update`).

## Commit Message Standards

TransitOps enforces the **Conventional Commits** specification (version 1.0.0). Commits must follow this structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Supported Commit Types
- **`feat`**: A new user-facing capability (e.g., `feat(dispatch): validate driver duty hours before trip`).
- **`fix`**: A bug fix (e.g., `fix(registry): allow alphanumeric vehicle plate registrations`).
- **`docs`**: Documentation-only modifications (e.g., `docs: add roadmap outline`).
- **`style`**: White-space, formatting, missing semi-colons (no operational changes).
- **`refactor`**: Code changes that neither fix a bug nor add a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`chore`**: Changes to the build process, auxiliary tools, or libraries.

## Pull Request Workflow

1. **Pull the Latest**: Always ensure your local base branch is synced with origin.
2. **Create Branch**: Branch off the main development branch with the correct prefix (e.g., `git checkout -b feature/dispatch-engine`).
3. **Execute Work**: Write small, focused commits. Ensure no debug logs are committed.
4. **Code Format & Lint**: Run the project linters and formatters before committing.
5. **Write Tests**: Write unit/integration tests for your changes.
6. **Push and Open PR**: Push to origin and open a Pull Request.
7. **Code Review**: At least one other core team member must review and approve the PR before merge.
8. **Merge**: Once approved, merge using squash merging to preserve a clean commit history.

## Code Quality Expectations

- **Dry & Clean**: Avoid repeating logic. Wrap shared business validation into dedicated helpers or services.
- **TypeScript & Type Safety**: Ensure all new types are properly typed. Avoid using `any` unless absolutely necessary.
- **Error Handling**: Implement structured try/catch blocks. Ensure API routes always return appropriate HTTP status codes and structured JSON messages.
- **Middleware Gating**: Secure all REST routes and Socket.IO namespaces with appropriate JWT and RBAC middleware.

## Testing Expectations

- **Automated Verification**: Every new feature or business rule override must be accompanied by appropriate test cases.
- **Coverage**: Maintain a high level of test coverage on target validation engines.
- **Pre-commit Checks**: Tests must pass locally before pushed.

## Documentation Requirements

- **API Documentation**: Document all new endpoint definitions, payloads, and response payloads.
- **JSDoc/Comments**: Use clear comments for complex algorithmic sections, especially scoring engines and compliance calculators.
- **README Updates**: If a configuration variable is added or modified, ensure it is updated in the configuration guides.
