# Setting up GitHub Personal Access Token for Workflow Push

## Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. **Note name:** `portfolio-workflow-push`
3. **Expiration:** 90 days (or your preference)
4. **Select scopes:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **IMPORTANT:** Copy the token immediately (you won't see it again!)

## Step 2: Configure Git to Use Token

### Option A: Using Git Credential Helper (Recommended)

```bash
# Store token in macOS Keychain
git config --global credential.helper osxkeychain

# When you push, Git will prompt for username and password
# Username: your GitHub username (tizy2u2-tz)
# Password: paste your Personal Access Token (not your GitHub password)
```

### Option B: Update Remote URL (Alternative)

```bash
# Replace YOUR_TOKEN with your actual token
git remote set-url origin https://YOUR_TOKEN@github.com/tizy2u2-tz/my_portfolio.git
```

## Step 3: Test the Push

```bash
git push origin main
```

The push should now work with the workflow file included.

## Security Notes

- Never commit tokens to git
- Tokens are stored securely in macOS Keychain (Option A)
- If using Option B, the token will be visible in `git remote -v` output
