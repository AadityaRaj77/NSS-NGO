export function TextInput(props: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{props.label}</label>
      <input
        {...props}
        className="w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
}

export function SelectInput(props: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{props.label}</label>
      <select
        {...props}
        className="w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
      >
        {props.children}
      </select>
    </div>
  );
}

export function TextArea(props: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">{props.label}</label>
      <textarea
        {...props}
        className="w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
}
