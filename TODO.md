# TODO: Fix ESLint Errors

## Errors to Fix (18 errors, 1 warning)

### 1. AuthContext.tsx
- Line 89: 'error' is defined but never used
- Line 99: 'password' is defined but never used
- Line 243: Fast refresh warning - file exports non-components

### 2. usePosts.ts
- Line 104: 'err' is defined but never used

### 3. Login.tsx
- Line 26: 'error' is defined but never used

### 4. Signup.tsx
- Line 52: 'error' is defined but never used

### 5. Create.tsx
- Line 8: 'Image' is defined but never used
- Line 116: 'error' is defined but never used
- Line 160: 'color' is defined but never used

### 6. Explore.tsx
- Line 96: Unexpected any. Specify a different type

### 7. Home.tsx
- Line 13: Unexpected any. Specify a different type

### 8. Notifications.tsx
- Line 32: 'getNotificationColor' is assigned a value but never used

### 9. Profile.tsx
- Line 14: 'Settings' is defined but never used
- Line 22: 'isAuthenticated' is assigned a value but never used
- Line 48: Unexpected any. Specify a different type
- Line 219: Unexpected any. Specify a different type

### 10. Settings.tsx
- Line 59: 'error' is defined but never used
- Line 72: 'error' is defined but never used
- Line 85: 'error' is defined but never used

## Plan
1. Fix unused variables by prefixing with underscore or using them
2. Replace 'any' types with proper TypeScript types
3. Remove unused imports
4. Address fast refresh warning by moving non-component exports
