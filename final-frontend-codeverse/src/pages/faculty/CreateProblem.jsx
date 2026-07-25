import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

const CreateProblem = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      difficulty: "Easy",
      topic: "",
      statement: "",
      constraints: "",
      starter_code: "",
      visible_test_cases: [{ input: "", output: "" }],
      hidden_test_cases: [{ input: "", output: "" }],
    },
  });

  const visible = useFieldArray({ control, name: "visible_test_cases" });
  const hidden = useFieldArray({ control, name: "hidden_test_cases" });

  const onSubmit = async (data) => {
    // Swap this for: await api.post("/problems/", data);
    await new Promise((r) => setTimeout(r, 700));
    console.log("Problem payload", data);
    toast.success("Problem saved as draft");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Create Coding Problem</h1>
        <p className="text-sm text-ink-400">Fill in the details for a new practice problem.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card space-y-4 p-6">
          <div>
            <label className="label">Title</label>
            <input className="input" placeholder="e.g. Two Sum" {...register("title", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Difficulty</label>
              <select className="input" {...register("difficulty")}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="label">Topic / Tag</label>
              <input className="input" placeholder="Array, Hash Map" {...register("topic")} />
            </div>
          </div>

          <div>
            <label className="label">Problem statement</label>
            <textarea className="input min-h-[120px]" {...register("statement", { required: true })} />
          </div>

          <div>
            <label className="label">Constraints</label>
            <textarea className="input min-h-[80px]" placeholder="One per line" {...register("constraints")} />
          </div>

          <div>
            <label className="label">Starter code</label>
            <textarea
              className="input min-h-[100px] font-mono text-xs"
              {...register("starter_code")}
            />
          </div>
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-800">Public test cases</h3>
            <button
              type="button"
              onClick={() => visible.append({ input: "", output: "" })}
              className="btn-ghost text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add case
            </button>
          </div>
          {visible.fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-2">
              <input className="input" placeholder="Input" {...register(`visible_test_cases.${i}.input`)} />
              <input className="input" placeholder="Expected output" {...register(`visible_test_cases.${i}.output`)} />
              <button type="button" onClick={() => visible.remove(i)} className="rounded-lg p-2 text-ink-300 hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-800">Hidden test cases</h3>
            <button
              type="button"
              onClick={() => hidden.append({ input: "", output: "" })}
              className="btn-ghost text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add case
            </button>
          </div>
          {hidden.fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-2">
              <input className="input" placeholder="Input" {...register(`hidden_test_cases.${i}.input`)} />
              <input className="input" placeholder="Expected output" {...register(`hidden_test_cases.${i}.output`)} />
              <button type="button" onClick={() => hidden.remove(i)} className="rounded-lg p-2 text-ink-300 hover:text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="btn-secondary">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Draft
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Publish Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProblem;
