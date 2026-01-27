import * as React from "react"
import { ChevronRight, Folder, File } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

interface TreeViewProps {
  data: TreeNode[]
  selectedId?: string
  expandedIds?: string[]
  onSelect?: (id: string) => void
  onExpand?: (id: string, expanded: boolean) => void
  className?: string
}

interface TreeItemProps {
  node: TreeNode
  level: number
  selectedId?: string
  expandedIds: Set<string>
  onSelect?: (id: string) => void
  onToggle: (id: string) => void
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
}) => {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id

  return (
    <div>
      <div
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-disabled={node.disabled}
        tabIndex={node.disabled ? -1 : 0}
        onClick={() => {
          if (node.disabled) return
          if (hasChildren) {
            onToggle(node.id)
          } else {
            onSelect?.(node.id)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (node.disabled) return
            if (hasChildren) {
              onToggle(node.id)
            } else {
              onSelect?.(node.id)
            }
          }
        }}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        className={cn(
          "flex items-center gap-2 py-2 pr-3 text-sm cursor-pointer transition-colors duration-fast-02",
          "hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          isSelected && "bg-carbon-gray-10 dark:bg-carbon-gray-80",
          node.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Expand/collapse chevron */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform duration-fast-02",
                isExpanded && "rotate-90"
              )}
            />
          )}
        </span>

        {/* Icon */}
        <span className="shrink-0">
          {node.icon || (hasChildren ? (
            <Folder className="h-4 w-4 text-carbon-gray-50" />
          ) : (
            <File className="h-4 w-4 text-carbon-gray-50" />
          ))}
        </span>

        {/* Label */}
        <span className="truncate">{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, selectedId, expandedIds: controlledExpandedIds, onSelect, onExpand, className }, ref) => {
    const [internalExpandedIds, setInternalExpandedIds] = React.useState<Set<string>>(
      new Set(controlledExpandedIds || [])
    )

    const expandedIds = controlledExpandedIds
      ? new Set(controlledExpandedIds)
      : internalExpandedIds

    const handleToggle = (id: string) => {
      const newExpanded = !expandedIds.has(id)
      if (onExpand) {
        onExpand(id, newExpanded)
      } else {
        setInternalExpandedIds((prev) => {
          const next = new Set(prev)
          if (newExpanded) {
            next.add(id)
          } else {
            next.delete(id)
          }
          return next
        })
      }
    }

    return (
      <div
        ref={ref}
        role="tree"
        className={cn("py-1", className)}
      >
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            expandedIds={expandedIds}
            onSelect={onSelect}
            onToggle={handleToggle}
          />
        ))}
      </div>
    )
  }
)
TreeView.displayName = "TreeView"

export { TreeView }

