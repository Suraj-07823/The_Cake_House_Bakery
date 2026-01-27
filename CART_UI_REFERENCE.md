# 🎨 Cart Features - Visual Reference Guide

## Toast Notifications

### Success Toast (✅ Green)
```
┌─────────────────────────────────────┐
│ ✅ "Chocolate Cake" added to cart!  │  X
└─────────────────────────────────────┘
```
- **Color**: Green border (#4caf50)
- **Duration**: 3 seconds
- **Animation**: Slides in from right
- **Trigger**: Add to cart, quantity updated

### Error Toast (❌ Red)
```
┌─────────────────────────────────────┐
│ ❌ Please select an item            │  X
└─────────────────────────────────────┘
```
- **Color**: Red border (#f44336)
- **Duration**: 3 seconds (auto-dismiss or manual close)
- **Trigger**: Invalid actions

### Warning Toast (⚠️ Orange)
```
┌─────────────────────────────────────┐
│ ⚠️ Quantity must be at least 1      │  X
└─────────────────────────────────────┘
```
- **Color**: Orange border (#ff9800)
- **Duration**: 3 seconds
- **Trigger**: Constraint violations

### Info Toast (ℹ️ Blue)
```
┌─────────────────────────────────────┐
│ ℹ️ "Strawberry Dream" removed       │  X
└─────────────────────────────────────┘
```
- **Color**: Blue border (#2196f3)
- **Duration**: 3 seconds
- **Trigger**: Informational messages

---

## Order Block Components

### Complete Order Block Example:
```
╔═══════════════════════════════════════════════════════╗
║                  Order Block 1                        ║
║                                        🗑️ Delete Block
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  🍫 Chocolate Delight Cake                           ║
║     Category: Cakes                                   ║
║     Qty: [−] [2] [+]     ← Editable quantity!       ║
║     ₹450 × 2 = ₹900                                  ║
║                                                    ✕ ║
║                                                       ║
║  🍓 Strawberry Dream                                  ║
║     Category: Cakes                                   ║
║     Qty: [−] [1] [+]                                 ║
║     ₹500 × 1 = ₹500                                  ║
║                                                    ✕ ║
║                                                       ║
║                                                       ║
║              ➕ Add Item to This Block                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

Add quantity with [+] or [−]
Edit directly in the number field
Remove items with ✕ button
```

### Quantity Editor (Inline)
```
Qty: [−] [2] [+]
 ↑    ↑   ↑   ↑
 |    |   |   Plus button (increase by 1)
 |    |   Number input field (editable)
 |    Minus button (decrease by 1)
 Label
```

**Features:**
- Click `[+]` to increase quantity
- Click `[−]` to decrease quantity
- Click on number field to type custom quantity
- Press Enter or Tab to confirm
- Toast notification shows the change
- Price updates instantly

---

## Confirmation Dialog

### Delete Order Block Confirmation
```
╔══════════════════════════════════════╗
║                                      ║
║   Delete Order Block 1?              ║
║                                      ║
║   [Cancel]      [Yes, Delete]        ║
║                                      ║
╚══════════════════════════════════════╝
```

**Behavior:**
- Modal backdrop (50% transparent black)
- "Cancel" button → Dialog closes, no action
- "Yes, Delete" button → Block deleted, toast shows
- Pop-in animation (300ms)

---

## Cart Page Layout

### Full Cart View
```
┌─────────────────────────────────────────────────────────────┐
│  Shopping Cart 🛒                                           │
│  Review your items and place your order                     │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐    ┌──────────────────────┐
│                              │    │   Order Summary      │
│  [Order Block 1]             │    │                      │
│  - Cakes (editable)          │    │ Total Items: 5       │
│  - Cupcakes (editable)       │    │ Total Price: ₹2,450  │
│                              │    │                      │
│  [Order Block 2]             │    │ [Clear Cart]         │
│  - Decorations (editable)    │    │ [Send via WhatsApp]  │
│                              │    │                      │
│  [➕ Add New Order Block]     │    │                      │
│                              │    │                      │
└──────────────────────────────┘    └──────────────────────┘
```

**Left Side (Main Cart):**
- Display all order blocks
- Each block shows all items
- Inline editing for quantities
- Add/remove items
- Add new blocks button

**Right Side (Summary):**
- Total items count
- Total price calculation
- Clear cart button
- Send order button
- Sticky on desktop (follows scroll)

---

## Item Card Animations

### Item Fade-In (When Added)
```
Time 0ms:    (invisible, slightly below)
             ↓
Time 300ms:  (visible, correct position)

Animation: fadeIn (opacity 0→1, translateY 10px→0)
Duration: 300ms
Easing: ease-out
```

### Item Slide-Out (When Removed)
```
Time 0ms:    (visible, normal position)
             ↓
Time 300ms:  (invisible, far right)

Animation: slideOut (opacity 1→0, translateX 0→100%)
Duration: 300ms
Easing: ease-out
```

---

## Mobile View Changes

### Responsive Breakpoints

#### Desktop (>768px)
```
┌────────────────────────────────────────────────────┐
│ Order Blocks                    │  Summary Sticky  │
│ (Left 2/3)                      │  (Right 1/3)     │
└────────────────────────────────────────────────────┘
```

#### Tablet (≤768px)
```
┌────────────────────────────────────────────────────┐
│ Order Blocks (Full Width)                          │
├────────────────────────────────────────────────────┤
│ Summary Below Blocks                               │
└────────────────────────────────────────────────────┘
```

#### Mobile (≤480px)
```
┌──────────────────────────┐
│ Order Blocks             │
│ (Full width, no padding) │
├──────────────────────────┤
│ Summary                  │
│ (Full width below)       │
├──────────────────────────┤
│ Toast notifications      │
│ (Full width at bottom)   │
└──────────────────────────┘
```

---

## Color Palette

### Primary Colors
```
Brand Color: #d4745f (Warm Coral/Rose)
Light BG:    #fff5f0 (Very Light Pink)
Light BG:    #ffe4d6 (Light Peach)
Text:        #4a4a4a (Dark Gray)
Text Light:  #888888 (Medium Gray)
```

### Toast Colors
```
Success: #4caf50 (Green)
Error:   #f44336 (Red)
Warning: #ff9800 (Orange)
Info:    #2196f3 (Blue)
```

### Button Colors
```
Primary:   #d4745f (Brand color)
Secondary: #e0e0e0 (Light gray)
Delete:    #ff6b6b (Red)
Hover:     Slightly darker
Active:    Scale down 0.95
```

---

## User Actions & Feedback

### Action Flow Chart

```
┌─────────────────────────────────────────────────────┐
│ USER ACTION                    │ VISUAL FEEDBACK    │
├─────────────────────────────────────────────────────┤
│ Click "Add to Cart"            → ✅ Toast (success) │
│ Click [+] Qty Button           → ✅ Toast (updated)│
│ Click [−] Qty Button           → ✅ Toast (updated)│
│ Edit Qty Field                 → ✅ Toast (updated)│
│ Click ✕ (Remove Item)          → 🎬 Slide out      │
│                                   ✅ Toast (removed)│
│ Click 🗑️ (Delete Block)        → 🎨 Confirm modal  │
│   → Click "Yes"                → 🎬 Block removed  │
│                                   ✅ Toast (deleted)│
│   → Click "Cancel"             → 🎭 Modal closes   │
│ Click "Clear Cart"             → ✅ Toast (cleared)│
│ Click "Send via WhatsApp"      → 🌐 Opens WhatsApp │
│                                   (with message)    │
└─────────────────────────────────────────────────────┘

Symbols:
✅ Toast notification slides in
🎬 Smooth animation plays
🎨 Modal dialog appears
🎭 Modal disappears
🌐 Opens new window/link
```

---

## Keyboard Shortcuts (Future)

Current (Manual Only):
- Click buttons for actions
- Type in quantity field

Potential Future Shortcuts:
- `Esc` - Close modal/dialog
- `Enter` - Confirm quantity edit
- `Backspace` - Remove item
- `+` / `-` - Adjust quantity

---

## Touch Interactions (Mobile)

### Quantity Editor
```
Tap [−] → Decrease quantity
Tap [+] → Increase quantity
Tap [2] → Focus input, edit manually
Tap outside → Blur, confirm change
```

### Item Card
```
Tap ✕ → Remove item (no confirm on mobile)
Swipe left → (Future: quick delete option)
Long press → (Future: item details)
```

### Buttons
```
Touch feedback: Color change + slight scale
Ripple effect: (Could be added)
Min 44px × 44px: Touch targets (for accessibility)
```

---

## Accessibility Features

### Visual
- ✅ High contrast text (#4a4a4a on #fff)
- ✅ Color-coded toast (not just color, has emoji)
- ✅ Clear button labels

### Keyboard
- ✅ Tab navigation through buttons
- ✅ Enter to confirm (quantity input)
- ✅ Esc to close modals

### Screen Reader (Future)
- [ ] ARIA labels on buttons
- [ ] Role attributes on custom components
- [ ] Live region for toast notifications
- [ ] Dialog role for modals

---

## Animation Reference

### Keyframes Summary

| Animation | From | To | Duration | Use Case |
|-----------|------|-----|----------|-----------|
| slideIn | X: 400px, Opacity: 0 | X: 0, Opacity: 1 | 300ms | Toast appear |
| popIn | Scale: 0.9, Opacity: 0 | Scale: 1, Opacity: 1 | 300ms | Modal appear |
| fadeIn | Opacity: 0, Y: 10px | Opacity: 1, Y: 0 | 300ms | Item appear |
| slideOut | Opacity: 1, X: 0 | Opacity: 0, X: 100% | 300ms | Item delete |

---

## Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Android
- ⚠️ IE11 (No CSS animations)

---

*Last Updated: January 28, 2026*
*Version: 2.0 - Editable Cart with Animations*
