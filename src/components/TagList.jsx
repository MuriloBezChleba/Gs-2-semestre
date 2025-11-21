function TagList({ tags, variant = 'primary', limit = null }) {
  const displayTags = limit ? tags.slice(0, limit) : tags
  const hasMore = limit && tags.length > limit

  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  }

  const classes = variantClasses[variant] || variantClasses.primary

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className={`${classes} px-3 py-1 rounded-full text-xs font-medium transition-colors`}
        >
          {tag}
        </span>
      ))}
      {hasMore && (
        <span className="text-gray-500 dark:text-gray-400 text-xs self-center">
          +{tags.length - limit} mais
        </span>
      )}
    </div>
  )
}

export default TagList
