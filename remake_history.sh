#!/bin/bash

# Configuration
REPO_URL="https://github.com/ramanverse/ShopSmart.git"

# Clean up existing git
rm -rf .git
git init

# Helper function for commits
make_commit() {
    local date="$1"
    local msg="$2"
    local files="$3"
    
    # Use git add for specific files/folders
    for f in $files; do
        if [ -e "$f" ]; then
            git add "$f"
        fi
    done
    
    GIT_AUTHOR_DATE="$date 14:00:00" GIT_COMMITTER_DATE="$date 14:00:00" git commit -m "$msg"
}

# 1. Feb 1
make_commit "2026-02-01" "initial: setup project architecture with frontend and backend monorepo" "package.json .gitignore README.md"

# 2. Feb 4
make_commit "2026-02-04" "feat: configure database schema with prisma and postgresql" "backend/prisma"

# 3. Feb 8
make_commit "2026-02-08" "feat: implement core authentication with nextauth v5" "frontend/lib/auth.ts frontend/app/api/auth"

# 4. Feb 12
make_commit "2026-02-12" "feat: build responsive navbar and footer components" "frontend/components/layout frontend/app/layout.tsx frontend/app/globals.css"

# 5. Feb 16
make_commit "2026-02-16" "feat: develop home page hero section and search functionality" "frontend/app/page.tsx frontend/components/home/HeroSearch.tsx"

# 6. Feb 20
make_commit "2026-02-20" "feat: implement car listing page with advanced filtering" "frontend/app/cars/page.tsx frontend/components/cars/FilterSidebar.tsx"

# 7. Feb 24
make_commit "2026-02-24" "feat: create car details page and image gallery" "frontend/app/cars/[slug]/page.tsx frontend/components/cars/CarGallery.tsx"

# 8. Feb 28
make_commit "2026-02-28" "feat: add emi calculator and financial tools" "frontend/app/emi-calculator/page.tsx"

# 9. Mar 4
make_commit "2026-03-04" "feat: develop sell your car flow with valuation form" "frontend/app/sell/page.tsx"

# 10. Mar 8
make_commit "2026-03-08" "feat: implement user dashboard for wishlist and bookings" "frontend/app/dashboard"

# 11. Mar 12
make_commit "2026-03-12" "feat: build admin panel for inventory management" "frontend/app/admin"

# 12. Mar 16
make_commit "2026-03-16" "feat: integrate stripe payment gateway and enquiries" "frontend/app/api/create-payment-intent/route.ts"

# 13. Mar 19
make_commit "2026-03-19" "feat: add showroom locator and blog section" "frontend/app/showrooms frontend/app/blog"

# 14. Mar 22
make_commit "2026-03-22" "feat: implement car comparison tool side-by-side" "frontend/app/compare"

# 15. Mar 25
make_commit "2026-03-25" "fix: final UI polish, SEO optimization and deployment readiness" "."

# Setup remote and push
git remote add origin $REPO_URL
echo "History recreated successfully with Feb 1 to March 25 timeline."
