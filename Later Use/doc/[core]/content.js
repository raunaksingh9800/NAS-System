
import { Paper } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

import { IconBrandGithub, IconTerminal, IconFolder } from '@tabler/icons-react';
import Link from 'next/link';


const exampleCode = `
use rustc_data_structures::fx::FxHashMap;
use rustc_lint::LintStore;
use rustc_lint_defs::{declare_tool_lint, Lint, LintId};
use rustc_session::{lint, Session};

use std::sync::LazyLock as Lazy;

/// This function is used to setup the lint initialization. By default, in rustdoc, everything
/// is "allowed". Depending if we run in test mode or not, we want some of them to be at their
/// default level. For example, the "INVALID_CODEBLOCK_ATTRIBUTES" lint is activated in both
/// modes.
///
/// A little detail easy to forget is that there is a way to set the lint level for all lints
/// through the "WARNINGS" lint. To prevent this to happen, we set it back to its "normal" level
/// inside this function.
///
/// It returns a tuple containing:
///  * Vector of tuples of lints' name and their associated "max" level
///  * HashMap of lint id with their associated "max" level
pub(crate) fn init_lints<F>(
    mut allowed_lints: Vec<String>,
    lint_opts: Vec<(String, lint::Level)>,
    filter_call: F,
) -> (Vec<(String, lint::Level)>, FxHashMap<lint::LintId, lint::Level>)
where
    F: Fn(&lint::Lint) -> Option<(String, lint::Level)>,
{
    let warnings_lint_name = lint::builtin::WARNINGS.name;

    allowed_lints.push(warnings_lint_name.to_owned());
    allowed_lints.extend(lint_opts.iter().map(|(lint, _)| lint).cloned());

    let lints = || {
        lint::builtin::HardwiredLints::get_lints()
            .into_iter()
            .chain(rustc_lint::SoftLints::get_lints())
    };

    let lint_opts = lints()
        .filter_map(|lint| {
            // Permit feature-gated lints to avoid feature errors when trying to
            // allow all lints.
            if lint.feature_gate.is_some() || allowed_lints.iter().any(|l| lint.name == l) {
                None
            } else {
                filter_call(lint)
            }
        })
        .chain(lint_opts)
        .collect::<Vec<_>>();

    let lint_caps = lints()
        .filter_map(|lint| {
            // We don't want to allow *all* lints so let's ignore
            // those ones.
            if allowed_lints.iter().any(|l| lint.name == l) {
                None
            } else {
                Some((lint::LintId::of(lint), lint::Allow))
            }
        })
        .collect();
    (lint_opts, lint_caps)
}

macro_rules! declare_rustdoc_lint {
    (
        $(#[$attr:meta])* $name: ident, $level: ident, $descr: literal $(,)?
        $(@feature_gate = $gate:expr;)?
    ) => {
        declare_tool_lint! {
            $(#[$attr])* pub rustdoc::$name, $level, $descr
            $(, @feature_gate = $gate;)?
        }
    }
}



declare_rustdoc_lint! {

    REDUNDANT_EXPLICIT_LINKS,
    Warn,
    "detects redundant explicit links in doc comments"
}

pub(crate) static RUSTDOC_LINTS: Lazy<Vec<&'static Lint>> = Lazy::new(|| {
    vec![
        BROKEN_INTRA_DOC_LINKS,
        PRIVATE_INTRA_DOC_LINKS,
        MISSING_DOC_CODE_EXAMPLES,
        PRIVATE_DOC_TESTS,
        INVALID_CODEBLOCK_ATTRIBUTES,
        INVALID_RUST_CODEBLOCKS,
        INVALID_HTML_TAGS,
        BARE_URLS,
        MISSING_CRATE_LEVEL_DOCS,
        UNESCAPED_BACKTICKS,
        REDUNDANT_EXPLICIT_LINKS,
    ]
});

pub(crate) fn register_lints(_sess: &Session, lint_store: &mut LintStore) {
    lint_store.register_lints(&**RUSTDOC_LINTS);
    lint_store.register_group(
        true,
        "rustdoc::all",
        Some("rustdoc"),
        RUSTDOC_LINTS
            .iter()
            .filter(|lint| lint.feature_gate.is_none()) // only include stable lints
            .map(|&lint| LintId::of(lint))
            .collect(),
    );
    for lint in &*RUSTDOC_LINTS {
        let name = lint.name_lower();
        lint_store.register_renamed(&name.replace("rustdoc::", ""), &name);
    }
    lint_store
        .register_renamed("intra_doc_link_resolution_failure", "rustdoc::broken_intra_doc_links");
    lint_store.register_renamed("non_autolinks", "rustdoc::bare_urls");
    lint_store.register_renamed("rustdoc::non_autolinks", "rustdoc::bare_urls");
}
`;


 const DocContent = ( {t}) => {
    
    return (
        <main className="">
            <section className="w-full h-80 bg-slate-100 flex flex-col scroll-smooth">
                <div className=" pl-6 lg:pl-12 pt-10">
                    <h1 className=" text-5xl font-bold"> {t} 🔐 </h1>
                    <h3 className="pt-4 text-lg opacity-50">Base component to create custom inputs</h3>
                </div>

                <div className="pl-0 lg:pl-4 pt-6">
                    <table className="border-separate border-spacing-x-8 border-spacing-y-2 ">
                        <tbody>
                        <tr>
                            <td className=' opacity-50'>Source</td>
                            <td> 
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    <IconBrandGithub size={18} />
                                    <Link href='https://github.com/raunaksingh9800/NAS-System' > View Source Code </Link> 
                                </div> 
                            </td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td className=' opacity-50'>Version</td>
                            <td> 
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    <IconTerminal size={18} />
                                    <p  >1.0.8</p> 
                                </div> 
                            </td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td className='opacity-50'>Directory</td>
                            <td> 
                                <div className='flex flex-row justify-start items-center gap-2'>
                                    < IconFolder size={18} />
                                    <p > Backend / Login / main.js </p> 
                                </div> 
                            </td>
                        </tr>
                        </tbody>
                </table>
                </div>



            </section>
            <section  className="w-full h-auto  flex flex-col scroll-smooth">
                <div className='pl-6 lg:pl-12 pt-6 pr-10 lg:pr-20'>
                    <h2 id='forgot-password' className='text-lg font-semibold'>
                        Forgot Password ? 🙁
                    </h2>
                    <h4 className='pt-4 text-sm  leading-6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque. Sed blandit libero volutpat sed cras ornare. Nunc eget lorem dolor sed. Sed enim ut sem viverra aliquet eget sit amet tellus. Nunc congue nisi vitae suscipit tellus mauris a diam. Sodales neque sodales ut etiam sit. Nec ultrices dui sapien eget mi proin. Sit amet est placerat in egestas erat. Imperdiet sed euismod nisi porta lorem. Tincidunt augue interdum velit euismod in pellentesque massa placerat.
                    </h4>
                </div>
                <div className='pl-6 lg:pl-12 pt-6 pr-10 lg:pr-20'>
                    <h2 className='text-lg font-semibold'>
                        Forgot Password ? 🙁
                    </h2>
                    <h4 className='pt-4 text-sm  leading-6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque. Sed blandit libero volutpat sed cras ornare. Nunc eget lorem dolor sed. Sed enim ut sem viverra aliquet eget sit amet tellus. Nunc congue nisi vitae suscipit tellus mauris a diam. Sodales neque sodales ut etiam sit. Nec ultrices dui sapien eget mi proin. Sit amet est placerat in egestas erat. Imperdiet sed euismod nisi porta lorem. Tincidunt augue interdum velit euismod in pellentesque massa placerat.
                    </h4>
                </div>
                
            </section>
        </main>
    )
 }


 export default DocContent;